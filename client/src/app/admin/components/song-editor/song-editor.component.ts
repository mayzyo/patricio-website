import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Output, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, forkJoin, from, iif, of } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { UppyAngularDashboardModule } from '@uppy/angular';
import { EditorService } from '../../services/editor.service';
import { SongFormService } from '../../services/song-form.service';
import { EditorAction } from '../../interfaces/editor-action';
import { ImageConverter } from '../../classes/image.converter';

@Component({
    selector: 'app-song-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
    ],
    templateUrl: './song-editor.component.html',
    styleUrl: './song-editor.component.scss',
    host: { class: 'card' }
})
export class SongEditorComponent {
    @Output() action = new EventEmitter<EditorAction>();

    private readonly clearUploaders$ = new Subject<void>();
    protected coverUploader$ = this.initialiseUploader();
    protected audioUploader$ = this.initialiseUploader();
    protected readonly thumbnail$ = this.initialiseThumbnail(this.coverUploader$);
    protected readonly audioSelected = this.initialiseFileSelected(this.audioUploader$);
    private readonly coverSelected = this.initialiseFileSelected(this.coverUploader$);

    protected readonly form = this.songForm.form;

    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);
    protected readonly pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
    protected readonly songSelected$ = this.form.get('id')?.valueChanges.pipe(map(res => res != null));
    protected readonly audioIdExists$ = this.form.get('audioId')?.valueChanges.pipe(map(res => res != null));

    constructor(
        private destroyRef: DestroyRef,
        private http: HttpClient,
        private editor: EditorService,
        private songForm: SongFormService
    ) {
        this.RespondToSetThumbnailValue();
        this.RespondToClearUploaders();
        this.RespondToFormPristine();
    }

    clearUploaders(): void {
        this.clearUploaders$.next();
    }

    protected onSubmit(): void {
        this.validating.set(true);

        if(this.form.valid && !this.submitting()) {
            this.submitting.set(true);
            const uploadCover$ = this.initialiseUploadFile(this.coverUploader$, 'coverId');
            const uploadAudio$ = this.initialiseUploadFile(this.audioUploader$, 'audioId');

            if(this.audioSelected()) {
                iif(
                    () => this.coverSelected() == true,
                    forkJoin([uploadCover$, uploadAudio$]),
                    uploadAudio$
                ).pipe(
                    switchMap(() => this.songForm.save()),
                    takeUntilDestroyed(this.destroyRef)
                ).subscribe(() => this.onComplete({ clearSelection: false }));
            } else if(this.form.get('audioId')?.value) {
                iif(
                    () => this.coverSelected() == true,
                    uploadCover$,
                    of(null)
                ).pipe(
                    switchMap(() => this.songForm.save()),
                    takeUntilDestroyed(this.destroyRef)
                ).subscribe(() => this.onComplete({ clearSelection: false }));
            }
        }
    }

    protected onRemove(): void {
        const id = this.form.get('id')?.value;

        if(id) {
            this.submitting.set(true);
            
            this.songForm.remove(id)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete({ clearSelection: true }));
        }
    }

    private onComplete(editorAction: EditorAction): void {
        this.submitting.set(false);
        this.validating.set(false);

        this.action.emit(editorAction);

        this.songForm.clear();
        this.clearUploaders();
    }

    private RespondToSetThumbnailValue(): void {
        effect(() => {
            if(!this.coverSelected()) {
                untracked(() => this.form.get('thumbnail')?.setValue(''));
            }
        });

        this.thumbnail$.pipe(takeUntilDestroyed()).subscribe(thumbnail => {
            this.form.get('thumbnail')?.setValue(thumbnail);
            this.form.get('thumbnail')?.markAsDirty();
        });
    }

    private RespondToClearUploaders(): void {
        this.clearUploaders$.pipe(
            switchMap(() => forkJoin([this.coverUploader$.pipe(take(1)), this.audioUploader$.pipe(take(1))])),
            takeUntilDestroyed()
        ).subscribe(([coverUploader, audioUploader]) => {
            coverUploader.cancelAll({ reason: 'user' });
            audioUploader.cancelAll({ reason: 'user' });
        });
    }

    private RespondToFormPristine(): void {
        this.form.statusChanges.pipe(
            filter(() => this.form.pristine),
            takeUntilDestroyed()
        ).subscribe(() => untracked(() => this.validating.set(false)));
    }

    private initialiseUploader(): Observable<Uppy> {
        return this.editor.idToken$.pipe(
            map(idToken => new Uppy({ restrictions: { maxNumberOfFiles: 1 }, allowMultipleUploadBatches: false })
                .use(ImageEditor)
                .use(XHR, {
                    headers: { 'Authorization': idToken },
                    endpoint: 'https://patricio-website-admin-dev.azurewebsites.net/api/save-media',
                    getResponseData: responseText => responseText,
                })
            ),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    private initialiseUploadFile(uploader$: Observable<Uppy>, formKey: string) {
        return uploader$.pipe(
            switchMap(uploader => iif(
                () => uploader.getFiles().length == 0,
                of(null),
                from(uploader.upload()).pipe(
                    tap((res: any) => this.form.get(formKey)?.setValue(res.successful[0].response?.body))
                )
            )),
            take(1)
        );
    }

    private initialiseFileSelected(uploader$: Observable<Uppy>) {
        return toSignal(uploader$.pipe(
            switchMap(uploader => new Observable<boolean>(subscriber => {
                uploader.on('file-added', () => subscriber.next(true));
                uploader.on('file-removed', () => subscriber.next(false));
            })),
            startWith(false)
        ));
    }

    private initialiseThumbnail(uploader: Observable<Uppy>): Observable<string> {
        return uploader.pipe(
            switchMap(uploader => new Observable<string>(subscriber => {
                uploader.on('thumbnail:generated', (_, preview) => subscriber.next(preview));
            })),
            switchMap(preview => this.http.get(preview, { responseType: 'blob' })),
            switchMap(blob => ImageConverter.blobToBase64(blob))
        );
    }
}

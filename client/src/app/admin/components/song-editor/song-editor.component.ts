import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Inject, Output, Signal, computed, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, forkJoin, from, iif, of } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { UppyAngularDashboardModule } from '@uppy/angular';
import { EditorService } from '../../services/editor.service';
import { SongFormService } from '../../services/song-form.service';
import { EditorAction } from '../../interfaces/editor-action';
import { ImageConverter } from '../../classes/image.converter';
import { API_URL } from '../../../app.config';
import { ThumbRemoveButtonComponent } from '../../../shared/components/thumb-remove-button/thumb-remove-button.component';

@Component({
    selector: 'app-song-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
        ThumbRemoveButtonComponent
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
    private readonly fileThumbnail$ = this.initialiseFileThumbnail(this.coverUploader$);
    protected readonly audioSelected = toSignal(
        this.initialiseFileSelected(this.audioUploader$).pipe(startWith(false))
    );
    private readonly coverSelected$ = this.initialiseFileSelected(this.coverUploader$);
    private readonly coverSelected = toSignal(this.coverSelected$.pipe(startWith(false)));

    protected readonly form = this.songForm.form;

    protected readonly audioId = toSignal(this.form.get('audioId')?.valueChanges ?? EMPTY);
    protected readonly thumbnail = toSignal(this.form.get('thumbnail')?.valueChanges ?? EMPTY);
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);
    protected readonly pristine = this.initialisePristine(this.audioSelected, this.coverSelected);
    protected readonly selected$ = this.form.get('id')?.valueChanges.pipe(map(res => res != null));

    constructor(
        @Inject(API_URL) private apiUrl: string,
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

    protected onRemoveAudioId(): void {
        this.form.get('audioId')?.markAsDirty();
        this.form.get('audioId')?.setValue('');
    }

    protected onRemoveCoverId(): void {
        this.form.get('coverId')?.markAsDirty();
        this.form.get('coverId')?.setValue('');
        this.form.get('thumbnail')?.markAsDirty();
        this.form.get('thumbnail')?.setValue('');
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
                ).subscribe(() => this.onComplete({ clearSelection: true }));
            } else if(this.form.get('audioId')?.value) {
                iif(
                    () => this.coverSelected() == true,
                    uploadCover$,
                    of(null)
                ).pipe(
                    switchMap(() => this.songForm.save()),
                    takeUntilDestroyed(this.destroyRef)
                ).subscribe(() => this.onComplete({ clearSelection: true }));
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

        if(editorAction.clearSelection) {
            this.songForm.clear();
        }
        
        this.clearUploaders();
    }

    private RespondToSetThumbnailValue(): void {
        this.coverSelected$.pipe(
            filter(res => !res),
            takeUntilDestroyed()
        ).subscribe(() => {
            this.form.get('thumbnail')?.markAsDirty();
            this.form.get('thumbnail')?.setValue('');
        })

        this.fileThumbnail$.pipe(takeUntilDestroyed()).subscribe(thumbnail => {
            this.form.get('thumbnail')?.markAsDirty();
            this.form.get('thumbnail')?.setValue(thumbnail);
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
                    endpoint: this.apiUrl.concat('save-media'),
                    getResponseData: responseText => responseText,
                })
            ),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    private initialiseUploadFile(uploader$: Observable<Uppy>, formKey: string): Observable<unknown> {
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

    private initialiseFileSelected(uploader$: Observable<Uppy>): Observable<boolean> {
        return uploader$.pipe(
            switchMap(uploader => new Observable<boolean>(subscriber => {
                uploader.on('file-added', () => subscriber.next(true));
                uploader.on('file-removed', () => subscriber.next(false));
            })),
        );
    }

    private initialiseFileThumbnail(uploader: Observable<Uppy>): Observable<string> {
        return uploader.pipe(
            switchMap(uploader => new Observable<string>(subscriber => {
                uploader.on('thumbnail:generated', (_, preview) => subscriber.next(preview));
            })),
            switchMap(preview => this.http.get(preview, { responseType: 'blob' })),
            switchMap(blob => ImageConverter.blobToBase64(blob))
        );
    }

    private initialisePristine(audioSelected: Signal<boolean | undefined>, coverSelected: Signal<boolean | undefined>): Signal<boolean | undefined> {
        const pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
        return computed(() => pristine() && !audioSelected() && !coverSelected());
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Output, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, forkJoin, from, iif, merge } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { UppyAngularDashboardModule } from '@uppy/angular';
import { EditorService } from '../../services/editor.service';
import { SongFormService } from '../../services/song-form.service';

@Component({
    selector: 'app-song-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
    ],
    templateUrl: './song-editor.component.html',
    styleUrl: './song-editor.component.scss',
    host: {
        class: 'card'
    }
})
export class SongEditorComponent {
    @Output() saved = new EventEmitter<void>();

    protected coverUploader$ = this.initialiseUploader();
    protected audioUploader$ = this.initialiseUploader();
    protected readonly thumbnail$ = this.initialiseThumbnail(this.coverUploader$);
    protected readonly audioSelected = this.initialiseFileSelected(this.audioUploader$);
    private readonly coverSelected = this.initialiseFileSelected(this.coverUploader$);
    protected readonly form = this.songForm.form;

    protected readonly submitting = signal(false);
    protected readonly updateValidating$ = new Subject<boolean>();
    protected readonly validating$ = merge(
        this.updateValidating$,
        this.songForm.form.statusChanges.pipe(filter(() => this.songForm.form.pristine), map(() => false))
    );
    protected readonly songSelected$ = this.form.get('id')?.valueChanges.pipe(map(res => res != null));

    private readonly clearUploaders$ = new Subject<void>();

    constructor(private http: HttpClient, private editor: EditorService, private songForm: SongFormService) {
        this.RespondToSetThumbnailValue();
        this.RespondToClearUploaders();
    }

    clearUploaders(): void {
        this.clearUploaders$.next();
    }

    protected onSubmit(): void {
        this.updateValidating$.next(true);

        if(this.songForm.form.valid) {
            this.submitting.set(true);
            const updateCover$ = this.initialiseUploadFile(this.coverUploader$, 'coverId');
            const uploadAudio$ = this.initialiseUploadFile(this.audioUploader$, 'audioId');
            
            iif(
                () => this.coverSelected() == true,
                forkJoin([updateCover$, uploadAudio$]),
                uploadAudio$
            ).pipe(switchMap(() => this.songForm.save())).subscribe(() => this.onComplete());
        }
    }

    protected onRemove(): void {
        const id = this.form.get('id')?.value;

        if(id) {
            this.submitting.set(true);
            this.songForm.remove(id).subscribe(() => this.onComplete());
        }
    }

    private onComplete(): void {
        this.submitting.set(false);
        this.updateValidating$.next(false);

        this.saved.emit();

        this.songForm.clear();
        this.clearUploaders();
    }

    private RespondToSetThumbnailValue(): void {
        effect(() => {
            if(!this.coverSelected()) {
                untracked(() => {
                    this.songForm.form.get('thumbnail')?.setValue('');
                });
            }
        });

        this.thumbnail$.pipe(takeUntilDestroyed())
            .subscribe(thumbnail => this.songForm.form.get('thumbnail')?.setValue(thumbnail));
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
            switchMap(uploader => from(uploader.upload())),
            tap((res: any) => this.songForm.form.get(formKey)?.setValue(res.successful[0].response?.body)),
            take(1),
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
            switchMap(blob => this.blobToBase64(blob))
        );
    }

    private blobToBase64(blob: Blob): Observable<string> {
        return new Observable(subscriber => {
            const reader = new FileReader();
            reader.onloadend = () => {
                subscriber.next(reader.result as string);
                subscriber.complete();
            };
            reader.readAsDataURL(blob);
        });
    }
}

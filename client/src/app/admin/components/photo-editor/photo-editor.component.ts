import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Inject, Output, Signal, computed, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, from, iif, of } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { DashboardComponent } from '@uppy/angular';
import { EditorService } from '../../services/editor.service';
import { EditorAction } from '../../interfaces/editor-action';
import { ImageConverter } from '../../classes/image.converter';
import { PhotoFormService } from '../../services/photo-form.service';
import { API_URL } from '../../../app.config';
import { ThumbRemoveButtonComponent } from '../../../shared/components/thumb-remove-button/thumb-remove-button.component';

@Component({
    selector: 'app-photo-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardComponent,
        ThumbRemoveButtonComponent
    ],
    templateUrl: './photo-editor.component.html',
    styleUrl: './photo-editor.component.scss',
    host: { class: 'card' }
})
export class PhotoEditorComponent {
    @Output() action = new EventEmitter<EditorAction>();

    private readonly clearUploader$ = new Subject<void>();
    protected imageUploader$ = this.initialiseUploader();
    private readonly fileThumbnail$ = this.initialiseFileThumbnail(this.imageUploader$);
    private readonly imageSelected$ = this.initialiseFileSelected(this.imageUploader$);
    private readonly imageSelected = toSignal(
        this.imageSelected$.pipe(startWith(false))
    );

    protected readonly form = this.photoForm.form;

    protected readonly thumbnail = toSignal(this.form.get('thumbnail')?.valueChanges ?? EMPTY);
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);
    protected readonly pristine = this.initialisePristine(this.imageSelected);
    protected readonly selected$ = this.form.get('id')?.valueChanges.pipe(map(res => res != null));

    constructor(
        @Inject(API_URL) private apiUrl: string,
        private destroyRef: DestroyRef,
        private http: HttpClient,
        private editor: EditorService,
        private photoForm: PhotoFormService
    ) {
        this.RespondToSetThumbnailValue();
        this.RespondToClearUploaders();
        this.RespondToFormPristine();
    }

    clearUploader(): void {
        this.clearUploader$.next();
    }

    protected onRemoveImage(): void {
        this.form.get('thumbnail')?.markAsDirty();
        this.form.get('thumbnail')?.setValue('');
        this.form.get('imageId')?.markAsDirty();
        this.form.get('imageId')?.setValue('');
    }

    protected onSubmit(): void {
        this.validating.set(true);

        if(this.form.valid && !this.submitting() && this.photoOrVideoLinks()) {
            this.submitting.set(true);
            const uploadImage$ = this.initialiseUploadFile(this.imageUploader$, 'imageId');
            
            uploadImage$.pipe(
                switchMap(() => this.photoForm.save()),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => this.onComplete({ clearSelection: true }));
        }
    }

    protected onRemove(): void {
        const id = this.form.get('id')?.value;

        if(id) {
            this.submitting.set(true);
            
            this.photoForm.remove(id)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete({ clearSelection: true }));
        }
    }

    private onComplete(editorAction: EditorAction): void {
        this.submitting.set(false);
        this.validating.set(false);

        this.action.emit(editorAction);

        if(editorAction.clearSelection) {
            this.photoForm.clear();
        }
        
        this.clearUploader();
    }

    private photoOrVideoLinks(): boolean {
        return this.imageSelected() || this.form.get('youtube')?.value != '' || this.form.get('bilibili')?.value != '';
    }

    private RespondToSetThumbnailValue(): void {
        this.imageSelected$.pipe(
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
        this.clearUploader$.pipe(
            switchMap(() => this.imageUploader$.pipe(take(1))),
            takeUntilDestroyed()
        ).subscribe(imageUploader => imageUploader.cancelAll());
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
                    // getResponseData: responseText => responseText,
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

    private initialisePristine(imageSelected: Signal<boolean | undefined>): Signal<boolean | undefined> {
        const pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
        return computed(() => pristine() && !imageSelected());
    }
}

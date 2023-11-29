import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Output, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { UppyAngularDashboardModule } from '@uppy/angular';
import { EditorService } from '../../services/editor.service';
import { EditorAction } from '../../interfaces/editor-action';
import { ImageConverter } from '../../classes/image.converter';
import { PhotoFormService } from '../../services/photo-form.service';

@Component({
    selector: 'app-photo-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
    ],
    templateUrl: './photo-editor.component.html',
    styleUrl: './photo-editor.component.scss',
    host: { class: 'card' }
})
export class PhotoEditorComponent {
    @Output() action = new EventEmitter<EditorAction>();

    protected imageUploader$ = this.initialiseUploader();
    protected readonly thumbnail$ = this.initialiseThumbnail(this.imageUploader$);
    protected readonly previewSelected = this.initialiseFileSelected(this.imageUploader$);

    protected readonly form = this.photoForm.form;

    protected readonly thumbnail = toSignal(this.form.get('thumbnail')?.valueChanges ?? EMPTY);
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);
    protected readonly songSelected$ = this.form.get('id')?.valueChanges.pipe(map(res => res != null));
    protected readonly audioIdExists$ = this.form.get('audioId')?.valueChanges.pipe(map(res => res != null));

    constructor(
        private destroyRef: DestroyRef,
        private http: HttpClient,
        private editor: EditorService,
        private photoForm: PhotoFormService
    ) {
        this.RespondToSetThumbnailValue();
        this.RespondToFormPristine();
    }

    protected onSubmit(): void {
        this.validating.set(true);

        if(this.form.valid && !this.submitting()) {
            this.submitting.set(true);
            
            this.photoForm.save()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete({ clearSelection: true }));
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

        this.photoForm.clear();
    }

    private RespondToSetThumbnailValue(): void {
        effect(() => {
            if(!this.previewSelected()) {
                untracked(() => this.form.get('thumbnail')?.setValue(''));
            }
        });

        this.thumbnail$.pipe(takeUntilDestroyed()).subscribe(thumbnail => {
            this.form.get('thumbnail')?.setValue(thumbnail);
            this.form.get('thumbnail')?.markAsDirty();
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

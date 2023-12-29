import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Inject, Output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { UppyAngularDashboardModule } from '@uppy/angular';
import { EditorService } from '../../services/editor.service';
import { EditorAction } from '../../interfaces/editor-action';
import { ImageConverter } from '../../classes/image.converter';
import { FeedFormService } from '../../services/feed-form.service';
import { API_URL } from '../../../app.config';
import { ThumbRemoveButtonComponent } from '../../../shared/components/thumb-remove-button/thumb-remove-button.component';

@Component({
    selector: 'app-feed-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
        ThumbRemoveButtonComponent
    ],
    templateUrl: './feed-editor.component.html',
    styleUrl: './feed-editor.component.scss',
    host: { class: 'card' }
})
export class FeedEditorComponent {
    @Output() action = new EventEmitter<EditorAction>();

    private readonly clearUploader$ = new Subject<void>();
    protected previewUploader$ = this.initialiseUploader();
    private readonly fileThumbnail$ = this.initialiseFileThumbnail(this.previewUploader$);
    protected readonly previewSelected$ = this.initialiseFileSelected(this.previewUploader$);

    protected readonly form = this.feedForm.form;

    protected readonly thumbnail = toSignal(this.form.get('thumbnail')?.valueChanges ?? EMPTY);
    protected readonly pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
    protected readonly selected$ = this.form.get('id')?.valueChanges.pipe(map(res => res != null));
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);

    constructor(
        @Inject(API_URL) private apiUrl: string,
        private destroyRef: DestroyRef,
        private http: HttpClient,
        private editor: EditorService,
        private feedForm: FeedFormService
    ) {
        this.respondToSetThumbnailValue();
        this.respondToClearUploader();
        this.respondToFormPristine();
        this.respondToIsEvent();
    }

    protected onRemoveThumbnail(): void {
        this.form.get('thumbnail')?.markAsDirty();
        this.form.get('thumbnail')?.setValue('');
    }

    protected onSubmit(): void {
        this.validating.set(true);

        if(this.form.valid && !this.submitting()) {
            this.submitting.set(true);
            
            this.feedForm.save()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete({ clearSelection: true }));
        }
    }

    protected onRemove(): void {
        const id = this.form.get('id')?.value;

        if(id) {
            this.submitting.set(true);
            
            this.feedForm.remove(id)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete({ clearSelection: true }));
        }
    }

    private onComplete(editorAction: EditorAction): void {
        this.submitting.set(false);
        this.validating.set(false);

        this.action.emit(editorAction);

        if(editorAction.clearSelection) {
            this.feedForm.clear();
        }

        this.clearUploader();
    }

    private clearUploader(): void {
        this.clearUploader$.next();
    }

    private respondToSetThumbnailValue(): void {
        this.previewSelected$.pipe(
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

    private respondToClearUploader(): void {
        this.clearUploader$.pipe(
            switchMap(() => this.previewUploader$.pipe(take(1))),
            takeUntilDestroyed()
        ).subscribe(previewUploader => previewUploader.cancelAll({ reason: 'user' }));
    }

    private respondToFormPristine(): void {
        this.form.statusChanges.pipe(
            filter(() => this.form.pristine),
            takeUntilDestroyed()
        ).subscribe(() => untracked(() => this.validating.set(false)));
    }

    private respondToIsEvent(): void {
        this.form.get('isEvent')?.valueChanges.pipe(
            takeUntilDestroyed()
        ).subscribe(isEvent => {
            if(isEvent == false) {
                this.feedForm.clearEvents();
                this.clearUploader();
            }
        });
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
}

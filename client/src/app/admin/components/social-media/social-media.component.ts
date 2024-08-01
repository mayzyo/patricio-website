import { ChangeDetectionStrategy, Component, DestroyRef, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { UppyAngularDashboardModule } from '@uppy/angular';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { SocialMediaFormService } from '../../services/social-media-form.service';
import { ImageConverter } from '../../classes/image.converter';
import { EditorService } from '../../services/editor.service';
import { API_URL } from '../../../app.config';
import { ThumbRemoveButtonComponent } from '../../../shared/components/thumb-remove-button/thumb-remove-button.component';

@Component({
    selector: 'app-social-media',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
        EditorModalComponent,
        ThumbRemoveButtonComponent
    ],
    templateUrl: './social-media.component.html',
    styleUrl: './social-media.component.scss',
    providers: [SocialMediaFormService]
})
export class SocialMediaComponent {
    protected readonly form = this.socialMediaForm.form;

    protected qrCodeUploader$ = this.initialiseUploader();
    private readonly fileThumbnail$ = this.initialiseFileThumbnail(this.qrCodeUploader$);
    private readonly qrCodeSelected$ = this.initialiseFileSelected(this.qrCodeUploader$);

    protected readonly wechatQrCode = toSignal(this.form.get('weChatQrCode')?.valueChanges ?? EMPTY);
    protected readonly pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);

    constructor(
        @Inject(API_URL) private apiUrl: string,
        private destroyRef: DestroyRef,
        private http: HttpClient,
        private editor: EditorService,
        private socialMediaForm: SocialMediaFormService
    ) {
        this.RespondToSetQrCodeValue();
    }

    protected onRemoveWeChatQrCode(): void {
        this.form.get('weChatQrCode')?.markAsDirty();
        this.form.get('weChatQrCode')?.setValue('');
    }

    protected onSubmit(): void {
        this.validating.set(true);

        if(this.form.valid && !this.submitting()) {
            this.submitting.set(true);
            
            this.socialMediaForm.update()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete());
        }
    }

    private onComplete(): void {
        this.submitting.set(false);
        this.validating.set(false);
        this.form.markAsPristine();
    }

    private RespondToSetQrCodeValue(): void {
        this.qrCodeSelected$.pipe(
            filter(res => !res),
            takeUntilDestroyed()
        ).subscribe(() => {
            this.form.get('weChatQrCode')?.markAsDirty();
            this.form.get('weChatQrCode')?.setValue('');
        })

        this.fileThumbnail$.pipe(takeUntilDestroyed()).subscribe(thumbnail => {
            this.form.get('weChatQrCode')?.markAsDirty();
            this.form.get('weChatQrCode')?.setValue(thumbnail);
        });
    }

    private initialiseUploader(): Observable<Uppy> {
        return this.editor.idToken$.pipe(
            map(idToken => new Uppy({ restrictions: { maxNumberOfFiles: 1 }, allowMultipleUploadBatches: false })
                .use(XHR, {
                    headers: { 'Authorization': idToken },
                    endpoint: this.apiUrl.concat('save-media'),
                    // getResponseData: responseText => responseText,
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

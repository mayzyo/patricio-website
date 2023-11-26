import { ChangeDetectionStrategy, Component, DestroyRef, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { UppyAngularDashboardModule } from '@uppy/angular';
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { SocialMediaFormService } from '../../services/social-media-form.service';
import { ImageConverter } from '../../classes/image.converter';
import { EditorService } from '../../services/editor.service';

@Component({
    selector: 'app-social-media',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UppyAngularDashboardModule,
        EditorModalComponent,
    ],
    templateUrl: './social-media.component.html',
    styleUrl: './social-media.component.scss',
    providers: [SocialMediaFormService]
})
export class SocialMediaComponent {
    protected readonly form = this.socialMediaForm.form;

    protected qrCodeUploader$ = this.initialiseUploader();
    protected readonly thumbnail$ = this.initialiseThumbnail(this.qrCodeUploader$);
    protected readonly qrCodeSelected = this.initialiseFileSelected(this.qrCodeUploader$);

    protected readonly wechatQrCode = toSignal(this.form.get('weChatQrCode')?.valueChanges ?? EMPTY);
    protected readonly pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);

    constructor(
        private destroyRef: DestroyRef,
        private http: HttpClient,
        private editor: EditorService,
        private socialMediaForm: SocialMediaFormService
    ) {
        this.RespondToSetQrCodeValue();
    }

    protected onRemoveWeChatQrCode(): void {
        this.form.get('weChatQrCode')?.setValue('');
        this.form.get('weChatQrCode')?.markAsDirty();
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
        effect(() => {
            if(!this.qrCodeSelected()) {
                untracked(() => {
                    this.form.get('weChatQrCode')?.setValue('');
                });
            }
        });

        this.thumbnail$.pipe(takeUntilDestroyed())
            .subscribe(thumbnail => {
                this.form.get('weChatQrCode')?.setValue(thumbnail);
                this.form.get('weChatQrCode')?.markAsDirty();
            });
    }

    private initialiseUploader(): Observable<Uppy> {
        return this.editor.idToken$.pipe(
            map(idToken => new Uppy({ restrictions: { maxNumberOfFiles: 1 }, allowMultipleUploadBatches: false })
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

import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { SocialMedia } from '../../models/social-media';

@Injectable()
export class SocialMediaFormService {
    private readonly urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    readonly form = this.fb.group({
        facebook: ['', Validators.pattern(this.urlRegex)],
        linkedIn: ['', Validators.pattern(this.urlRegex)],
        instagram: ['', Validators.pattern(this.urlRegex)],
        weChatQrCode: [''], 
        weibo: ['', Validators.pattern(this.urlRegex)]
    });

    constructor(private fb: FormBuilder, private firestore: Firestore, private profile: ProfileService) {
        this.respondToSocialMedia();
        this.profile.refresh();
    }

    update(): Observable<SocialMedia> {
        const model: SocialMedia = {
            facebook: this.form.get('facebook')?.value ?? '',
            linkedIn: this.form.get('linkedIn')?.value ?? '',
            instagram: this.form.get('instagram')?.value ?? '',
            weChatQrCode: this.form.get('weChatQrCode')?.value ?? '',
            weibo: this.form.get('weibo')?.value ?? '',
        };

        return this.profile.profile$.pipe(
            map(({ id }) => doc(this.firestore, 'profile', id ?? '')),
            switchMap(targetDoc => from(updateDoc(targetDoc, model as any))),
            map(() => model),
            take(1)
        );
    }

    private respondToSocialMedia(): void {
        this.profile.profile$.pipe(takeUntilDestroyed())
            .subscribe(profile => this.form.setValue({
                facebook: profile.facebook ?? '',
                linkedIn: profile.linkedIn ?? '',
                instagram: profile.instagram ?? '',
                weChatQrCode: profile.weChatQrCode ?? '',
                weibo: profile.weibo ?? '',
            }));
    }
}

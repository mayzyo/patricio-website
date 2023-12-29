import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { SocialMedia } from '../../models/social-media';
import { urlValidator } from '../directives/url.directive';

@Injectable()
export class SocialMediaFormService {
    readonly form = this.fb.group({
        soundCloud: ['', urlValidator],
        facebook: ['', urlValidator],
        linkedIn: ['', urlValidator],
        instagram: ['', urlValidator],
        weChatQrCode: [''], 
        tiktok: ['', urlValidator],
        weibo: ['', urlValidator],
        vimeo: ['', urlValidator],
        youtube: ['', urlValidator],
        bilibili: ['', urlValidator],
    });

    constructor(private fb: FormBuilder, private firestore: Firestore, private profile: ProfileService) {
        this.respondToSocialMedia();
        this.profile.refresh();
    }

    update(): Observable<SocialMedia> {
        const model: SocialMedia = {
            soundCloud: this.form.get('soundCloud')?.value ?? '',
            facebook: this.form.get('facebook')?.value ?? '',
            linkedIn: this.form.get('linkedIn')?.value ?? '',
            instagram: this.form.get('instagram')?.value ?? '',
            weChatQrCode: this.form.get('weChatQrCode')?.value ?? '',
            tiktok: this.form.get('tiktok')?.value ?? '',
            weibo: this.form.get('weibo')?.value ?? '',
            vimeo: this.form.get('vimeo')?.value ?? '',
            youtube: this.form.get('youtube')?.value ?? '',
            bilibili: this.form.get('bilibili')?.value ?? ''
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
                soundCloud: profile.soundCloud ?? '',
                facebook: profile.facebook ?? '',
                linkedIn: profile.linkedIn ?? '',
                instagram: profile.instagram ?? '',
                weChatQrCode: profile.weChatQrCode ?? '',
                tiktok: profile.tiktok ?? '',
                weibo: profile.weibo ?? '',
                vimeo: profile.vimeo ?? '',
                youtube: profile.youtube ?? '',
                bilibili: profile.bilibili ?? '',
            }));
    }
}

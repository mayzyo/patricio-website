import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faBilibili, faFacebookSquare, faInstagram, faLinkedin, faSoundcloud, faTiktok, faVimeoV, faWeibo, faWeixin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { EditorService } from '../../../admin/services/editor.service';
import { ProfileService } from '../../services/profile.service';
import { SocialMedia } from '../../../models/social-media';

@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html',
    styleUrl: './social-media.component.scss',
    standalone: false
})
export class SocialMediaComponent {
    private profile = inject(ProfileService);
    private editor = inject(EditorService);

    protected readonly faSoundcloud = faSoundcloud;
    protected readonly faFacebookSquare = faFacebookSquare;
    protected readonly faLinkedin = faLinkedin;
    protected readonly faInstagram = faInstagram;
    protected readonly faWeixin = faWeixin;
    protected readonly faTiktok = faTiktok;
    protected readonly faWeibo = faWeibo;
    protected readonly faVimeoV = faVimeoV;
    protected readonly faYoutube = faYoutube;
    protected readonly faBilibili = faBilibili;
    protected readonly faEdit = faEdit;

    protected readonly socialMedia$ = this.initialiseSocialMedia();
    protected readonly viewOnly$ = this.editor.viewOnly$;
    
    protected async openSocialMediaEditor() {
        const { SocialMediaComponent } = await import("../../../admin/components/social-media/social-media.component");
        this.editor.open(SocialMediaComponent);
    }

    private initialiseSocialMedia(): Observable<SocialMedia> {
        return this.profile.profile$.pipe(
            map(profile => ({
                soundCloud: profile.soundCloud,
                facebook: profile.facebook,
                linkedIn: profile.linkedIn,
                instagram: profile.instagram,
                weChatQrCode: profile.weChatQrCode,
                tiktok: profile.tiktok,
                weibo: profile.weibo,
                vimeo: profile.vimeo,
                youtube: profile.youtube,
                bilibili: profile.bilibili
            }))
        );
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faFacebookSquare, faInstagram, faLinkedin, faWeibo, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { EditorService } from '../../../admin/services/editor.service';
import { ProfileService } from '../../services/profile.service';
import { SocialMedia } from '../../../models/social-media';

@Component({
    selector: 'app-social-media',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './social-media.component.html',
    styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
    protected readonly faFacebookSquare = faFacebookSquare;
    protected readonly faLinkedin = faLinkedin;
    protected readonly faInstagram = faInstagram;
    protected readonly faWeixin = faWeixin;
    protected readonly faWeibo = faWeibo;
    protected readonly faEdit = faEdit;

    protected readonly socialMedia$ = this.initialiseSocialMedia();
    protected readonly viewOnly$ = this.editor.viewOnly$;
    
    constructor(private profile: ProfileService, private editor: EditorService) { }

    protected async openSocialMediaEditor() {
        const { SocialMediaComponent } = await import("../../../admin/components/social-media/social-media.component");
        this.editor.open(SocialMediaComponent);
    }

    private initialiseSocialMedia(): Observable<SocialMedia> {
        return this.profile.profile$.pipe(
            map(profile => ({
                facebook: profile.facebook,
                linkedIn: profile.linkedIn,
                instagram: profile.instagram,
                weChatQrCode: profile.weChatQrCode,
                weibo: profile.weibo
            }))
        );
    }
}

import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { of } from 'rxjs';
import { faFacebookSquare, faInstagram, faLinkedin, faWeibo, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

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

    protected readonly socialMedia$ = of({
        facebook: 'https://www.google.com',
        linkedIn: 'https://www.google.com',
        instagram: 'https://www.google.com',
        weChat: 'https://www.google.com',
        weibo: 'https://www.google.com',
    });

    protected readonly _isSignedIn = signal(false);
    @Input() set isSignedIn(value: boolean) {
        this._isSignedIn.set(value);
    }

    protected async openSocialMediaAdmin() {
        // const { ProfileComponent } = await import("../../../admin/components/profile/profile.component");
        // this.editor.open(ProfileComponent);
    }
}

import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { faFacebookSquare, faInstagram, faLinkedin, faWeibo, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-social-media',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './social-media.component.html',
    styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent implements AfterViewInit {
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

    protected readonly viewOnly$ = this.editor.viewOnly$;
    
    constructor(private editor: EditorService) { }
    ngAfterViewInit(): void {
        this.openSocialMediaEditor();
    }

    protected async openSocialMediaEditor() {
        const { SocialMediaComponent } = await import("../../../admin/components/social-media/social-media.component");
        this.editor.open(SocialMediaComponent);
    }
}

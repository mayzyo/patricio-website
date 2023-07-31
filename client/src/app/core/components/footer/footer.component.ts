import { Component } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Auth, signInWithPopup, GoogleAuthProvider, user, signOut } from '@angular/fire/auth';
import { faFacebookSquare, faLinkedin, faInstagram, faWeixin, faWeibo } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { EditorService } from 'src/app/admin/services/editor.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    protected readonly faFacebookSquare = faFacebookSquare;
    protected readonly faLinkedin = faLinkedin;
    protected readonly faInstagram = faInstagram;
    protected readonly faWeixin = faWeixin;
    protected readonly faWeibo = faWeibo;
    protected readonly faEdit = faEdit;
    
    protected readonly socialMedia$ = this.profile.socialMedia$;
    protected readonly isSignedIn$ = user(this.auth).pipe(
        map(res => res != null),
        share()
    );

    constructor(
        private auth: Auth,
        private profile: ProfileService,
        private editor: EditorService
    ) { }

    signIn() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(this.auth, provider);
    }

    signOut() {
        signOut(this.auth);
    }

    async openSocialMediaAdmin() {
        const { ProfileComponent } = await import("../../../admin/components/profile/profile.component");
        this.editor.open(ProfileComponent);
    }
}

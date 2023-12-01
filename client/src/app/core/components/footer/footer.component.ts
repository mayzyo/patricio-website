import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Auth, signInWithPopup, user, GoogleAuthProvider } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    readonly signedIn$ = user(this.auth).pipe(map(res => res != null));

    constructor(private auth: Auth) { }

    signIn(): void {
        const provider = new GoogleAuthProvider();
        // Start a sign in process for an unauthenticated user.
        provider.addScope('email');
        signInWithPopup(this.auth, provider);
    }

    signOut(): void {
        this.auth.signOut();
    }
}

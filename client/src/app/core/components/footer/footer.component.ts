import { Component, inject } from '@angular/core';
import { Auth, signInWithPopup, user, GoogleAuthProvider } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: false
})
export class FooterComponent {
    private auth = inject(Auth);

    readonly signedIn$ = user(this.auth).pipe(map(res => res != null));

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

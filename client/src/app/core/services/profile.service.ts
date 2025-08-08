import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Profile } from '../../models/profile';
import { EmailConfig } from '../../models/email-config';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly firestore: Firestore = inject(Firestore);

    private readonly refresh$ = new Subject<void>();

    readonly profile$ = this.initialiseProfile();
    readonly biography$ = this.initialiseBiography(this.profile$);
    readonly emailConfig$ = this.initialiseEmailConfig(this.profile$);

    refresh(): void {
        this.refresh$.next();
    }

    private initialiseProfile(): Observable<Profile> {
        const profileCol = collection(this.firestore, 'profile');

        return this.refresh$.pipe(
            startWith(null),
            switchMap(() => collectionData(profileCol, { idField: 'id' }) as Observable<Profile[]>),
            map(res => res[0]),
            shareReplay(1)
        );
    }

    private initialiseBiography(profile$: Observable<Profile>): Observable<string[]> {
        return profile$.pipe(map(({ biographyCh, biographyEn }) => [biographyCh, biographyEn]));
    }

    private initialiseEmailConfig(profile$: Observable<Profile>): Observable<EmailConfig> {
        return profile$.pipe(map(({ purpose, senderType }) => ({ purpose, senderType })));
    }
}

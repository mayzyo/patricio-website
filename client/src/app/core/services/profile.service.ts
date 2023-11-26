import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Profile } from '../../models/profile';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly refresh$ = new Subject<void>();

    readonly profile$ = this.initialiseProfile();
    readonly biography$ = this.initialiseBiography(this.profile$);
    readonly email$ = this.initialiseEmail(this.profile$);

    constructor(private firestore: Firestore) { }

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

    private initialiseEmail(profile$: Observable<Profile>): Observable<string> {
        return profile$.pipe(map(({ email }) => email));
    }
}

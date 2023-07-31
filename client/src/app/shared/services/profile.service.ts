import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject, from, merge } from 'rxjs';
import { map, shareReplay, tap, scan } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';
import { SocialMedia } from 'src/app/models/social-media';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    readonly socialMedia$: Observable<SocialMedia>;
    readonly email$: Observable<string>;

    private readonly profile$: Observable<Profile>;
    private readonly updateProfile$ = new Subject<Partial<Profile>>();
    private readonly updateEmail$ = new Subject<string>();
    private readonly profileCollection: CollectionReference;
    private docId?: string;

    constructor(firestore: Firestore) {
        this.profileCollection = collection(firestore, 'profile');
        this.profile$ = this.initialiseProfile();
        this.socialMedia$ = this.initialiseSocialMedia(this.profile$);
        this.email$ = this.initialiseEmail(this.profile$);
    }

    update(socialMedia: SocialMedia, email: string): Observable<void> {
        const target = doc(this.profileCollection, this.docId);
        return from(updateDoc(target, { socialMedia, email })).pipe(
            tap(() => {
                this.updateProfile$.next({ socialMedia, email });
                this.updateEmail$.next(email);
            })
        );
    }

    private initialiseProfile(): Observable<Profile> {
        const fetched$ = collectionData(this.profileCollection, { idField: 'id' }) as Observable<Profile[]>;
        return merge(
            fetched$.pipe(
                tap(res => this.docId = res[0].id),
                map(res => res[0]),
            ),
            this.updateProfile$
        ).pipe(
            scan((acc, cur) => ({
                ...acc,
                ...cur,
                socialMedia: { ...acc.socialMedia, ...cur.socialMedia }
            }), {} as Profile),
            shareReplay(1)
        );
    }

    private initialiseSocialMedia(profile$: Observable<Profile>): Observable<SocialMedia> {
        return profile$.pipe(map(res => res.socialMedia));
    }

    private initialiseEmail(profile$: Observable<Profile>): Observable<string> {
        return profile$.pipe(map(res => res.email));
    }
}

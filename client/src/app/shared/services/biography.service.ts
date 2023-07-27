import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject, from, merge } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';

@Injectable({
    providedIn: 'root'
})
export class BiographyService {
    readonly raw$: Observable<string>;
    readonly paragraphs$: Observable<string[]>;

    private readonly updateRaw$ = new Subject<string>();
    private readonly profileCollection: CollectionReference;
    private docId?: string;

    constructor(firestore: Firestore) {
        this.profileCollection = collection(firestore, 'profile');
        this.raw$ = this.initialiseRaw(this.updateRaw$);
        this.paragraphs$ = this.initialiseParagraphs(this.raw$);
    }

    update(biography: string): Observable<void> {
        const target = doc(this.profileCollection, this.docId);
        return from(updateDoc(target, { biography })).pipe(
            tap(() => this.updateRaw$.next(biography))
        );
    }

    private initialiseRaw(updateRaw$: Observable<string>): Observable<string> {
        const profile$ = collectionData(this.profileCollection, { idField: 'id' }) as Observable<Profile[]>;

        return merge(
            profile$.pipe(
                tap(res => this.docId = res[0].id),
                map(res => res[0].biography),
            ),
            updateRaw$
        ).pipe(shareReplay(1));
    }

    private initialiseParagraphs(raw$: Observable<string>): Observable<string[]> {
        return raw$.pipe(
            map(res => {
                const cutoff = this.languageCut(res)
                return cutoff != -1
                    ? [res.slice(0, cutoff), res.slice(cutoff, res.length)]
                    : [res]
            })
        );
    }

    private languageCut(msg: string) {
        for (var i = 0, n = msg.length; i < n; i++) {
            // Chinese characters are above the 30,000 range in Unicode
            if (msg.charCodeAt(i) > 30000) {
                return i;
            }
        }
        return -1;
    }
}

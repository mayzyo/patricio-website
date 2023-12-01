import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { ProfileService } from '../../core/services/profile.service';
import { ProfilePrivate } from '../../models/email-private';
import { map, share, switchMap, take } from 'rxjs/operators';
import { Observable, forkJoin, from } from 'rxjs';

@Injectable()
export class ProfilePrivateService {
    private readonly profile$ = this.initialiseProfile();
    readonly email$ = this.profile$.pipe(map(({ email }) => email));

    constructor(private firestore: Firestore, private profile: ProfileService) { }

    update(model: ProfilePrivate): Observable<ProfilePrivate> {
        return forkJoin([
            this.profile$.pipe(map(({ id }) => id), take(1)),
            this.profile.profile$.pipe(map(({ id }) => id), take(1)),
        ]).pipe(
            map(([privateId, profileId]) => doc(this.firestore, `profile/${profileId}/private/${privateId}`)),
            switchMap(targetDoc => from(updateDoc(targetDoc, model as any))),
            map(() => model),
        );
    }

    private initialiseProfile(): Observable<ProfilePrivate> {
        return this.profile.profile$.pipe(
            switchMap(({ id }) => {
                const privateCol = collection(this.firestore, `profile/${id}/private`);
                return (collectionData(privateCol, { idField: 'id' }) as Observable<Array<{ email: string }>>).pipe(take(1))
            }),
            map(res => res[0]),
            share()
        );
    }
}

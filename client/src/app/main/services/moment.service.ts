import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, limit, orderBy, query, startAt } from '@angular/fire/firestore';
import { Observable, Subject, iif, of } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Moment } from 'src/app/models/moment';
import { MomentAsync } from 'src/app/shared/classes/moment-async';
import { ContentService } from 'src/app/shared/services/content.service';

@Injectable({
    providedIn: 'root'
})
export class MomentService {
    public readonly pageSize: number = 6;
    public get EndReached() { return this.endReached; }
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<void>();
    private endReached: boolean = false;

    readonly list$ = this.refresh$.pipe(
        switchMap(() => this.load$.pipe(
            startWith(null),
            scan(acc => acc + 1, 0),
            switchMap(page => {
                const musicsCollection = collection(this.firestore, 'moments');
                const musicQuery = query(musicsCollection, orderBy('date'), startAt(page), limit(this.pageSize));
                const fetchedMusic$ = collectionData(musicQuery) as Observable<Moment[]>;

                return iif(
                    () => !this.endReached,
                    fetchedMusic$,
                    of([])
                )
            }),
            map<Moment[], MomentAsync[]>(res => res.map(el => new MomentAsync(el, this.contents))),
            scan<MomentAsync[], MomentAsync[]>((acc, cur) => acc.concat(cur), []),
            // Check length of current to be equal to size per page, determining if there is more
            tap(res => this.endReached = res.length % this.pageSize != 0)
        )),
        shareReplay(1),
    );

    constructor(private firestore: Firestore, private contents: ContentService) { }

    refresh() {
        this.endReached = false;
        this.refresh$.next();
    }

    load() {
        this.load$.next();
    }
}

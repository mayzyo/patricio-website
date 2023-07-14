import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, limit, orderBy, query, startAt, where, Query } from '@angular/fire/firestore';
import { Observable, Subject, iif, merge, of } from 'rxjs';
import { scan, switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { Update } from 'src/app/models/update';
import { Filter } from '../enums/filter';
import { UpdateAsync } from '../classes/update-async';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    public readonly pageSize: number = 10;
    public get EndReached() { return this.endReached; }
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<Filter>();
    private endReached: boolean = false;

    readonly results$ = this.refresh$.pipe(
        tap(() => this.endReached = false),
        switchMap(filter => merge(of(null), this.load$).pipe(
            scan(acc => acc + 1, 0),
            switchMap(page => {
                const readCollection = collection(this.firestore, 'feeds');
                let readQuery: Query<DocumentData>;
                switch (filter) {
                    case Filter.EVENT:
                        readQuery = query(readCollection, where('link', '!=', null), orderBy('link'), orderBy('date'), startAt(page), limit(this.pageSize));
                        break;
                    case Filter.POST:
                        readQuery = query(readCollection, where('link', '==', null), orderBy('link'), orderBy('date'), startAt(page), limit(this.pageSize));
                        break;
                    default:
                    case Filter.ALL:
                        readQuery = query(readCollection, orderBy('date'), startAt(page), limit(this.pageSize));
                }
                const fetchedUpdates$ = collectionData(readQuery) as Observable<Update[]>;
                
                return iif(
                    () => !this.endReached,
                    fetchedUpdates$,
                    of([])
                )
            }),
            map<Update[], UpdateAsync[]>(res => res.map(el => new UpdateAsync(el))),
            scan<UpdateAsync[], UpdateAsync[]>((acc, cur) => acc.concat(cur), []),
            tap(res => this.endReached = res.length % this.pageSize != 0),
        )),
        shareReplay(1),
    );

    constructor(private firestore: Firestore) { }

    refresh(filter: Filter) {
        this.refresh$.next(filter);
    }

    load() {
        this.load$.next();
    }
}

import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, limit, orderBy, query, startAt, where, Query } from '@angular/fire/firestore';
import { Observable, Subject, iif, merge, of } from 'rxjs';
import { scan, switchMap, tap, map, shareReplay, startWith } from 'rxjs/operators';
import { Update } from 'src/app/models/update';
import { Filter } from '../enums/filter';
import { UpdateAsync } from '../classes/update-async';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    readonly pageSize: number = 10;
    get endReached() { return this._endReached; }
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<Filter>();
    private _endReached: boolean = false;

    readonly list$ = this.refresh$.pipe(
        switchMap(filter => this.load$.pipe(
            startWith(null),
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
            tap(res => this._endReached = res.length % this.pageSize != 0),
        )),
        shareReplay(1),
    );

    constructor(private firestore: Firestore) { }

    refresh(filter: Filter) {
        this._endReached = false;
        this.refresh$.next(filter);
    }

    load() {
        this.load$.next();
    }
}

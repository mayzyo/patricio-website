import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, getCountFromServer, limit, orderBy, query, startAt, where } from '@angular/fire/firestore';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { map, scan, startWith, switchMap, take, takeWhile } from 'rxjs/operators';
import { Song } from '../../models/song';

@Injectable({
    providedIn: 'root'
})
export class SongService {
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<void>();
    private readonly pageSize = 10;
    readonly spotlightSize = 9;

    readonly list$: Observable<Song[]> = this.initialiseList();
    readonly spotlight$: Observable<Song[]> = this.initialiseFiltered('spotlight', this.spotlightSize);
    
    constructor(private firestore: Firestore) {}

    refresh(): void {
        this.refresh$.next();
    }

    load(): void {
        this.load$.next();
    }

    private initialiseList(): Observable<Song[]> {
        return this.refresh$.pipe(
            switchMap(() => this.initialiseLoad()),
        );
    }

    private initialiseLoad(): Observable<Song[]> {
        const songs = collection(this.firestore, 'songs');
        
        return combineLatest({
            page: this.load$.pipe(
                startWith(null),
                scan(acc => acc + 1, -1)
            ),
            total: this.initialiseTotal()
        }).pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            map(({ page }) => query(songs, orderBy('date'), startAt(page * this.pageSize), limit(this.pageSize))),
            switchMap(query => 
                (collectionData(query, { idField: 'id' }) as Observable<Song[]>).pipe(take(1))
            ),
            scan((acc, cur) => acc.concat(cur), new Array<Song>()),
        );
    }

    private initialiseTotal(): Observable<number> {
        const songs = collection(this.firestore, 'songs');
        const songQuery = query(songs);
        return from(getCountFromServer(songQuery)).pipe(
            map(res => res.data().count)
        );
    }

    private initialiseFiltered(filterProp: string, size = this.pageSize): Observable<Song[]> {
        const songs = collection(this.firestore, 'songs');
        const filteredQuery = query(songs, orderBy('date'), where(filterProp, '==', true), limit(size));
        return collectionData(filteredQuery) as Observable<Song[]>;
    }
}

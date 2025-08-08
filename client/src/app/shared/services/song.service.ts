import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, getCountFromServer, limit, orderBy, query, startAt, where } from '@angular/fire/firestore';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, take, takeWhile } from 'rxjs/operators';
import { Song } from '../../models/song';

@Injectable({
    providedIn: 'root'
})
export class SongService {
    private readonly firestore = inject(Firestore);

    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<void>();
    private readonly pageSize = 10;
    readonly spotlightSize = 9;

    private pagination$ = this.initialisePagination();
    readonly list$ = this.initialiseList();
    readonly spotlight$ = this.initialiseSpotlight();
    readonly endReached$ = this.initialiseEndReached();
    
    refresh(): void {
        this.refresh$.next();
    }

    load(): void {
        this.load$.next();
    }

    private initialiseList(): Observable<Song[]> {
        return this.refresh$.pipe(
            startWith(null),
            switchMap(() => this.initialiseLoad()),
            shareReplay(1)
        );
    }

    private initialiseLoad(): Observable<Song[]> {
        return this.pagination$.pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            switchMap(({ page }) => this.initialiseSongs(page)),
            scan((acc, cur) => acc.concat(cur), new Array<Song>()),
        );
    }

    private initialisePagination() : Observable<{ page: number, total: number }> {
        return combineLatest({
            page: this.load$.pipe(
                startWith(null),
                scan(acc => acc + 1, -1)
            ),
            total: this.initialiseTotal()
        }).pipe(shareReplay(1));
    }

    private initialiseTotal(): Observable<number> {
        const songs = collection(this.firestore, 'songs');
        return from(getCountFromServer(query(songs))).pipe(
            map(res => res.data().count)
        );
    }

    private initialiseSongs(page: number): Observable<Song[]> {
        const songs = collection(this.firestore, 'songs');
        const songsQuery = query(songs, orderBy('date'), startAt(page * this.pageSize), limit(this.pageSize));
        const songs$ = collectionData(songsQuery, { idField: 'id' }) as Observable<Song[]>;
        return songs$.pipe(take(1));
    }

    private initialiseSpotlight(): Observable<Song[]> {
        const songs = collection(this.firestore, 'songs');
        const filteredQuery = query(songs, orderBy('date'), where('spotlight', '==', true), limit(this.spotlightSize));
        const filtered$ = collectionData(filteredQuery, { idField: 'id' }) as Observable<Song[]>;
        return filtered$.pipe(take(1));
    }

    private initialiseEndReached(): Observable<boolean> {
        return this.pagination$.pipe(
            map(({ page, total }) => (page + 1) * this.pageSize >= total)
        );
    }
}

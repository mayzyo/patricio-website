import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, getCountFromServer, limit, orderBy, query, startAt } from '@angular/fire/firestore';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { map, scan, share, startWith, switchMap, take, takeWhile } from 'rxjs/operators';
import { Photo } from '../../models/photo';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<void>();
    private readonly pageSize = 10;

    private pagination$ = this.initialisePagination();
    readonly list$ = this.initialiseList();
    readonly endReached$ = this.initialiseEndReached();
    
    constructor(private firestore: Firestore) { }

    refresh(): void {
        this.refresh$.next();
    }

    load(): void {
        this.load$.next();
    }

    private initialiseList(): Observable<Photo[]> {
        return this.refresh$.pipe(
            startWith(null),
            switchMap(() => this.initialiseLoad()),
        );
    }

    private initialiseLoad(): Observable<Photo[]> {
        return this.pagination$.pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            switchMap(({ page }) => this.initialisePhotos(page)),
            scan((acc, cur) => acc.concat(cur), new Array<Photo>()),
        );
    }

    private initialisePagination() : Observable<{ page: number, total: number }> {
        return combineLatest({
            page: this.load$.pipe(
                startWith(null),
                scan(acc => acc + 1, -1)
            ),
            total: this.initialiseTotal()
        }).pipe(share());
    }

    private initialiseTotal(): Observable<number> {
        const songs = collection(this.firestore, 'photos');
        return from(getCountFromServer(query(songs))).pipe(
            map(res => res.data().count)
        );
    }

    private initialisePhotos(page: number): Observable<Photo[]> {
        const songs = collection(this.firestore, 'photos');
        const songsQuery = query(songs, orderBy('date'), startAt(page * this.pageSize), limit(this.pageSize));
        const songs$ = collectionData(songsQuery, { idField: 'id' }) as Observable<Photo[]>;
        return songs$.pipe(take(1));
    }

    private initialiseEndReached(): Observable<boolean> {
        return this.pagination$.pipe(
            map(({ page, total }) => (page + 1) * this.pageSize >= total)
        );
    }
}

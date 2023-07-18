import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, limit, orderBy, query, startAt, where } from '@angular/fire/firestore';
import { Observable, Subject, iif, of } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Music } from 'src/app/models/music';
import { MusicAsync } from '../../shared/classes/music-async';
import { ContentService } from 'src/app/shared/services/content.service';

@Injectable({
    providedIn: 'root'
})
export class MusicService {
    public readonly pageSize: number = 8;
    public get EndReached() { return this.endReached; }
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<void>();
    private endReached: boolean = false;

    readonly list$ = this.refresh$.pipe(
        switchMap(() => this.load$.pipe(
            startWith(null),
            scan(acc => acc + 1, 0),
            switchMap(page => {
                const musicsCollection = collection(this.firestore, 'musics');
                const musicQuery = query(musicsCollection, orderBy('date'), startAt(page), limit(this.pageSize));
                const fetchedMusic$ = collectionData(musicQuery) as Observable<Music[]>;

                return iif(
                    () => !this.endReached,
                    fetchedMusic$,
                    of([])
                )
            }),
            map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this, this.contents))),
            scan<MusicAsync[], MusicAsync[]>((acc, cur) => acc.concat(cur), []),
            // Check length of current to be equal to size per page, determining if there is more
            tap(res => this.endReached = res.length % this.pageSize != 0)
        )),
        shareReplay(1),
    );

    readonly onAudioLoad$ = new Subject<string>();
    readonly favourite$: Observable<MusicAsync[]>;

    constructor(private firestore: Firestore, private contents: ContentService) {
        const musicsCollection = collection(this.firestore, 'musics');
        const favouriteQuery = query(musicsCollection, where('favourite', '==', true));
        const fetchedFavourite$ = collectionData(favouriteQuery) as Observable<Music[]>;
        this.favourite$ = fetchedFavourite$.pipe(
            map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this, contents))),
            shareReplay(10)
        );
    }

    refresh() {
        this.endReached = false;
        this.refresh$.next();
    }

    load() {
        this.load$.next();
    }

    select$(id: number) {
        // return race<Music>(
        //   this.results$.pipe(
        //     map(res => res.find(el => el.id == id))
        //   ),
        //   this.http.get<Music>(`${this.baseUrl}musics/${id}`).pipe(
        //     map<Music, MusicAsync>(res => new MusicAsync(res, this)),
        //   )
        // ).pipe(
        //   take(1)
        // );
    }

    onRefresh$() {
        return this.refresh$ as Observable<void>;
    }

    private getMusics() {
        const itemCollection = collection(this.firestore, 'musics');
        return (collectionData(itemCollection) as Observable<Music[]>);
    }
}

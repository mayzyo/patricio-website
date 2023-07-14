import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable, Subject, iif, map, merge, of, race, scan, shareReplay, switchMap, tap } from 'rxjs';
import { ContentService } from './content.service';
import { Music } from 'src/app/models/music';
import { MusicAsync } from '../classes/music-async';

@Injectable({
    providedIn: 'root'
})
export class MusicService {
    public readonly pageSize: number = 8;
    public get EndReached() { return this.endReached; }
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<void>();
    private endReached: boolean = false;

    // readonly results$ = merge(of(null), this.refresh$).pipe(
    //   tap(() => this.endReached = false),
    //   switchMap(() => merge(of(null), this.load$).pipe(
    //     scan(acc => acc + 1, 0),
    //     switchMap(res => iif(
    //       () => !this.endReached,
    //       this.getMusics(),
    //       // this.http.get<Music[]>(`${this.baseUrl}musics`, { params: { page: res.toString(), size: this.pageSize.toString() } }),
    //       of([])
    //     )),
    //     map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this))),
    //     scan<MusicAsync[], MusicAsync[]>((acc, cur) => acc.concat(cur), []),
    //     tap(res => this.endReached = res.length % this.pageSize != 0) // Check length of current to be equal to size per page, determining if there is more.
    //   )),
    //   shareReplay(1),
    // );

    readonly onAudioLoad$ = new Subject<string>();
    readonly favourite$: Observable<MusicAsync[]>;

    constructor(
        private firestore: Firestore,
        public contents: ContentService,
    ) {
        const readCollection = collection(this.firestore, 'musics');
        const readQuery = query(readCollection, where('favourite', '==', true));
        const fetchedFavourite$ = collectionData(readQuery) as Observable<Music[]>;
        this.favourite$ = fetchedFavourite$.pipe(
            map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this))),
            shareReplay(10)
        );
    }

    refresh() {
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

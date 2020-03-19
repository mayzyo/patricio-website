import { Injectable } from '@angular/core';
import { Subject, of, merge, Observable, race, iif } from 'rxjs';
import { Music } from '../models/Music';
import { switchMap, map, shareReplay, tap, take, scan } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ContentService } from './content.service';
import { SafeUrl } from '@angular/platform-browser';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  public readonly pageSize: number = 8;
  public get EndReached() { return this.endReached; }
  private readonly load$ = new Subject<void>();
  private readonly refresh$ = new Subject<void>();
  private endReached: boolean = false;

  readonly results$ = merge(of(null), this.refresh$).pipe(
    tap(() => this.endReached = false),
    switchMap(() => merge(of(null), this.load$).pipe(
      scan<void, number>(acc => acc + 1, 0),
      switchMap(res => iif(
        () => !this.endReached,
        this.http.get<Music[]>('/api/musics', { params: { page: res.toString(), size: this.pageSize.toString() } }),
        of([])
      )),
      map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this))),
      scan<MusicAsync[], MusicAsync[]>((acc, cur) => acc.concat(cur), []),
      tap(res => this.endReached = res.length % this.pageSize != 0) // Check length of current to be equal to size per page, determining if there is more.
    )),
    shareReplay(1),
  );

  readonly onAudioLoad$ = new Subject<string>();

  readonly favourite$ = this.http.get<Music[]>('/api/musics', { params: { filter: 'FAVOURITES' } }).pipe(
    map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this))),
    shareReplay(10)
  );

  constructor(
    private http: HttpClient,
    public contents: ContentService,
  ) { }

  refresh() {
    this.refresh$.next();
  }

  load() {
    this.load$.next();
  }

  select$(id: number) {
    return race<Music>(
      this.results$.pipe(
        map(res => res.find(el => el.id == id))
      ),
      this.http.get<Music>(`/api/musics/${id}`).pipe(
        map<Music, MusicAsync>(res => new MusicAsync(res, this)),
      )
    ).pipe(
      take(1)
    );
  }

  onRefresh$() {
    return this.refresh$ as Observable<void>;
  }
}

export class MusicAsync implements Music {
  id: number;
  title: string;
  genre: string;
  date: Date;
  thumbnail: string;
  soundCloud: string;
  coverKey: string;
  audioKey: string;
  favourite: boolean;
  articleId: number;
  article: Article;
  audio$: Observable<SafeUrl>;
  cover$: Observable<string | SafeUrl>;

  constructor(ob: Music, musics: MusicService) {
    Object.keys(ob).forEach(key => this[key] = ob[key]);
    this.date = new Date(ob.date);
    this.audio$ = ob.audioKey && musics.contents.get(`/api/musics/audios/${ob.audioKey}`).pipe(
      tap(() => musics.onAudioLoad$.next(ob.audioKey))
    );
    this.cover$ = ob.thumbnail && merge(
      of(ob.thumbnail),
      musics.contents.get(`/api/musics/covers/${ob.coverKey}`)
    );
  }
}

  // Resetable Setup (This should be in the component clss)
  // readonly musics$ = merge(
  //   this.musics.results$.pipe(
  //     map(res => res.map(el => ({ ...el, state: State.INACTIVE, date: el.date.toDateString() }))), // Assign State to each object.
  //   ), 
  //   this.musics.onRefresh$()
  // ).pipe(
  //   scan<any[] | null, [unknown[], unknown[]]>((acc, cur) => 
  //     cur == null ? [[], []] : [acc[1], cur.filter(el => !acc[1].find(x => (x as any).id == el.id))], 
  //     [[], []]
  //   ), // Filter out the objects that exists in the previous state and outputing the [previous total, new objects].
  //   switchMap(res => from(res[1]).pipe(
  //     rapidFire(300),
  //     scan<unknown, unknown[]>((acc, cur) => acc.concat(cur), res[0]),
  //   )),
  //   tap(res => this.more = res.length % 10 == 0), // Check length of current to be equal to size per page, determining if there is more.
  // );

  // reset() {
  //   this.musics.refresh()
  // }
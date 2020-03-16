import { Injectable } from '@angular/core';
import { Subject, from, of, merge, BehaviorSubject, Observable, race } from 'rxjs';
import { Music } from '../models/Music';
import { switchMap, map, shareReplay, tap, filter, take, share, withLatestFrom, scan } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ContentService } from './content.service';
import { SafeUrl } from '@angular/platform-browser';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly page$ = new BehaviorSubject<number>(1);
  readonly current$ = this.page$.pipe(
    map(res => ({ page: res.toString(), size: '8' })),
    switchMap(res => this.http.get<Music[]>('/api/musics', { params: res })),
    map<Music[], MusicAsync[]>(res => res.map(el => new MusicAsync(el, this))),
    share()
  );
  readonly results$ = this.current$.pipe(
    withLatestFrom(this.page$),
    scan<[MusicAsync[], number], MusicAsync[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), [])
  )
  // readonly results$ = merge(
  //   of(null),
  //   this.reset$.pipe(
  //     tap(() => this.page$.next(1))
  //   )
  // ).pipe(
  //   switchMap(() => this.current$),
  //   scan<Music, Music[]>((acc, cur) => acc.concat(cur), [])
  // );


  readonly onAudio$ = new Subject<string>();
  private readonly updateResult$ = new BehaviorSubject<number>(1);
  readonly result$ = this.updateResult$.pipe(
    map(res => ({ page: res.toString(), size: '8' })),
    switchMap(res => this.http.get<Music[]>('/api/musics', { params: res })),
    map(res => res.map(el => ({
      ...el,
      date: new Date(el.date),
      audio$: el.audioKey && this.contents.get(`/api/musics/audios/${el.audioKey}`).pipe(
        tap(() => this.onAudio$.next(el.audioKey))
      ),
      cover$: el.thumbnail && merge(
        of(el.thumbnail),
        this.contents.get(`/api/musics/covers/${el.coverKey}`)
      )
    }))),
  );

  readonly favourite$ = this.http.get<Music[]>('/api/musics', { params: { filter: 'FAVOURITES' } }).pipe(
    switchMap(res => from(res)),
    map(res => ({ 
      ...res,
      url: `/discography/${res.id}`,
      cover$: res.thumbnail && merge(
        of(res.thumbnail),
        this.contents.get(`/api/musics/covers/${res.coverKey}`)
      )
    })),
    shareReplay(10)
  );

  constructor(
    private http: HttpClient,
    public contents: ContentService,
  ) { }

  toPage(num: number) {
    this.updateResult$.next(num);
    this.page$.next(num);
  }

  next() {
    this.updateResult$.next(this.updateResult$.value + 1);
    this.page$.next(this.page$.value + 1);
  }

  prev() {
    this.updateResult$.value > 1 && this.updateResult$.next(this.updateResult$.value - 1);
  }

  select$(id: number) {
    return race<Music>(
      this.result$.pipe(
        map(res => res.find(el => el.id == id))
      ),
      this.http.get<Music>(`/api/musics/${id}`).pipe(
        map(res => ({
          ...res,
          date: new Date(res.date),
          audio$: res.audioKey && this.contents.get(`/api/musics/audios/${res.audioKey}`).pipe(
            tap(() => this.onAudio$.next(res.audioKey))
          ),
          cover$: res.thumbnail && merge(
            of(res.thumbnail),
            this.contents.get(`/api/musics/covers/${res.coverKey}`)
          )
        })),
      )
    ).pipe(
      take(1)
    );
  }

  onPageChange$() {
    return this.updateResult$ as Observable<number>;
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
    Object.keys(this).forEach(key => this[key] = ob[key]);
    this.date = new Date(ob.date);
    this.audio$ = ob.audioKey && musics.contents.get(`/api/musics/audios/${ob.audioKey}`).pipe(
      tap(() => musics.onAudio$.next(ob.audioKey))
    );
    this.cover$ = ob.thumbnail && merge(
      of(ob.thumbnail),
      musics.contents.get(`/api/musics/covers/${ob.coverKey}`)
    )
  }
}
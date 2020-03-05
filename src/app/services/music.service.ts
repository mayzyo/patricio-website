import { Injectable } from '@angular/core';
import { Subject, from, of, merge, BehaviorSubject, Observable } from 'rxjs';
import { Music } from '../models/Music';
import { switchMap, map, shareReplay, tap, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private readonly updateResult$ = new BehaviorSubject<number>(1);

  readonly audio$ = new Subject<string>();

  readonly result$ = this.updateResult$.pipe(
    map(res => ({ page: res.toString(), size: '8' })),
    switchMap(res => this.http.get<Music[]>('/api/musics', { params: res })),
    switchMap(res => from(res)),
    map(res => ({
      ...res,
      date: new Date(res.date).toDateString(),
      audio$: res.audioKey && this.contents.get(`/api/musics/audios/${res.audioKey}`).pipe(
        tap(() => this.audio$.next(res.audioKey))
      ),
      cover$: res.thumbnail && merge(
        of(res.thumbnail),
        this.contents.get(`/api/musics/covers/${res.coverKey}`)
      )
    })),
    share()
  );

  readonly favourite$ = this.http.get<Music[]>('/api/musics', { params: { filter: 'FAVOURITES' } }).pipe(
    switchMap(res => from(res)),
    map(res => ({ 
      ...res,
      subtitle: res.genre,
      url: `/works/${res.id}`,
      cover$: res.thumbnail && merge(
        of(res.thumbnail),
        this.contents.get(`/api/musics/covers/${res.coverKey}`)
      )
    })),
    shareReplay(1)
  );

  constructor(
    private http: HttpClient,
    private contents: ContentService,
  ) { }

  toPage(num: number) {
    this.updateResult$.next(num);
  }

  next() {
    this.updateResult$.next(this.updateResult$.value + 1);
  }

  prev() {
    this.updateResult$.value > 1 && this.updateResult$.next(this.updateResult$.value - 1);
  }

  onPageChange$() {
    return this.updateResult$ as Observable<number>;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentService } from './content.service';
import { Observable, merge, of, Subject, iif } from 'rxjs';
import { map, switchMap, scan, shareReplay, tap } from 'rxjs/operators';
import { Moment } from '../models/Moment';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  public readonly pageSize: number = 6;
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
        this.http.get<Moment[]>('/api/media/moments', { params: { page: res.toString(), size: this.pageSize.toString() } }),
        of([])
      )),
      map<Moment[], MomentAsync[]>(res => res.map(el => new MomentAsync(el, this.contents))),
      scan<MomentAsync[], MomentAsync[]>((acc, cur) => acc.concat(cur), []),
      tap(res => this.endReached = res.length % this.pageSize != 0)
    )),
    shareReplay(1),
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
}

export class MomentAsync implements Moment {
  id: number;
  thumbnail: string;
  description: string;
  date: Date;
  imageKey: string;
  image$: Observable<string | SafeUrl>;

  constructor(ob: Moment, contents: ContentService) {
    Object.keys(ob).forEach(key => this[key] = ob[key]);
    this.date = new Date(ob.date);
    this.image$ = ob.thumbnail && merge(
      of(ob.thumbnail),
      contents.get(`/api/media/images/${ob.imageKey}`).pipe(
        shareReplay(1)
      )
    );
  }
}
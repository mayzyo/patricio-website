import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map, share, withLatestFrom, scan } from 'rxjs/operators';
import { Update } from '../models/Update';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private readonly page$ = new BehaviorSubject<number>(1);
  readonly current$ = this.page$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Update[]>('/api/updates', { params: res })),
    map<Update[], UpdateAsync[]>(res => res.map(el => new UpdateAsync(el))),
    share()
  );
  readonly results$ = this.current$.pipe(
    withLatestFrom(this.page$),
    scan<[UpdateAsync[], number], UpdateAsync[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), [])
  )

  filtered$(filter: Filter, size = 4) {
    return this.http.get<Update[]>('/api/updates', { params: { page: '1', size: size.toString(), filter } }).pipe(
      map<Update[], UpdateAsync[]>(res => res.map(el => new UpdateAsync(el))),
      share()
    );
  }

  constructor(
    private http: HttpClient,
  ) { }

  toPage(num: number) {
    this.page$.next(num);
  }

  next() {
    this.page$.next(this.page$.value + 1);
  }

  onPageChange$() {
    return this.page$ as Observable<number>;
  }
}

export enum Filter {
  ALL = 'ALL',
  EVENT = 'EVENT',
  POST = 'POST'
}

export class UpdateAsync implements Update {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  date: Date;
  image$: Observable<string | SafeUrl>;

  constructor(ob: Update) {
    Object.keys(ob).forEach(key => this[key] = ob[key]);
    this.date = new Date(ob.date);
    this.image$ = ob.thumbnail && of(ob.thumbnail);
  }
}
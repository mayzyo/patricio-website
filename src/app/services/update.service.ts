import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';
import { Update } from '../models/Update';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private readonly updateResult$ = new BehaviorSubject<number>(1);

  readonly result$ = this.updateResult$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Update[]>('/api/updates', { params: res })),
    switchMap(res => from(res)),
    map(res => ({ 
      ...res, 
      date: new Date(res.date), 
      image$: res.thumbnail && of(res.thumbnail) 
    })),
    share()
  );

  readonly event$ = this.http.get<Update[]>(
    '/api/updates',
    { params: { page: '1', size: '4', filter: 'EVENT' } }
  ).pipe(
    switchMap(res => from(res)),
    map(res => ({ 
      ...res, 
      date: new Date(res.date), 
      image$: res.thumbnail && of(res.thumbnail) 
    })),
    share()
  );

  constructor(
    private http: HttpClient,
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

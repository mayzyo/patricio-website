import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map, tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import { Quote } from '../models/Quote';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private profile$ = this.http.get<Profile>('/api/profile').pipe(
    shareReplay(1)
  );
  private quoteList$ = this.http.get<Quote[]>('/api/profile/quotes').pipe(
    shareReplay(1)
  );

  constructor(private http: HttpClient) { }

  get biography$(): Observable<string> {
    return this.profile$.pipe(
      pluck<Profile, string>('biography'),
    );
  }

  get occupation$(): Observable<string> {
    return this.profile$.pipe(
      pluck<Profile, string>('occupation'),
    );
  }

  get homeQuote$(): Observable<Quote> {
    return this.quoteList$.pipe(
      map(res => res.find(el => el.is_home))
    )
  }

  get randomQuote$(): Observable<Quote> {
    return this.quoteList$.pipe(
      map(res => {
        const val = res.filter(el => !el.is_home);
        return val[Math.floor(Math.random() * val.length)]
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import { Quote } from '../models/Quote';
import { Post } from '../models/Post';
import { Announcement } from '../models/Announcement';
import { Music } from '../models/Music';
import { Moment } from '../models/Moment';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  readonly workList$ = this.http.get<Music[]>('/api/work').pipe(
    shareReplay(1)
  );
  readonly momentPreview$ = this.http.get<Moment[]>(
    '/api/image/moments', 
    { params: { page: '1', size: '100', lang: this.languages.locale } }
  ).pipe(
    shareReplay(1)
  );

  readonly profile$ = this.http.get<Profile>('/api/profile', this.languages.localeParam).pipe(
    shareReplay(1)
  );
  private readonly quoteList$ = this.http.get<Quote[]>('/api/profile/quotes', this.languages.localeParam).pipe(
    shareReplay(1)
  );

  constructor(private http: HttpClient, private languages: LanguageService) { }

  get biography$(): Observable<string> {
    return this.profile$.pipe(
      pluck<Profile, string>('biography'),
    );
  }

  get homeQuote$(): Observable<Quote> {
    return this.quoteList$.pipe(
      map(res => res.find(el => el.is_home != null))
    );
  }

  get randomQuote$(): Observable<Quote> {
    return this.quoteList$.pipe(
      map(res => {
        const val = res.filter(el => !el.is_home);
        return val[Math.floor(Math.random() * val.length)]
      })
    );
  }

  blogPreview(page: string, size: string): Observable<Post[]> {
    return this.http.get<Post[]>(
      '/api/blog/latest', 
      { params: { page, size, lang: this.languages.locale } }
    );
  }

  blogArticle(post: { title: string }): Observable<string> {
    return this.http.get(
      '/api/blog/article', 
      { 
        params: { title: post.title, lang: this.languages.locale }, 
        responseType: 'text' 
      },
    );
  }

  announcement(page: string, size: string) {
    return this.http.get<Announcement[]>(
      '/api/announcement/latest', 
      { params: { page, size, lang: this.languages.locale } }
    );
  }

  eventAnnouncement(page: string, size: string) {
    return this.http.get<Announcement[]>(
      '/api/announcement/events', 
      { params: { page, size, lang: this.languages.locale } }
    );
  }
}

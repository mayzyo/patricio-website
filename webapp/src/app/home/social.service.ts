import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  latest$: Observable<Post[]> = this.http.get<Post[]>('/Posts').pipe(
    map(res => res.slice(0, 3))
  );
  posts$: Observable<Post[]> = this.http.get<Post[]>('/Posts');

  constructor(private http: HttpClient) { }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { paths } from 'src/app/shared/backend.api';
import { Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  latest$: Observable<Post[]> = this.http.get<PostResponse>('/Posts?page=1&size=10')
  .pipe(
    map(res => 
      res.map(el => this.bindPost(el))
    )
  );

  constructor(private http: HttpClient) { }

  private bindPost(res: PostResponse[number]): Post {
    return {
      title: res.heading,
      date: new Date(res.created || ''),
      imageUrl: ''
    };
  }
}

type PostResponse = paths["/Posts"]["get"]["responses"][200]["text/plain"];
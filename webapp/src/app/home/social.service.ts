import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { LatestPost, Media, Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  latest$: Observable<LatestPost[]> = this.http.get<Post[]>(
    `${environment.backend}/Posts/Event`,
    { params: { size: "3" } }
  ).pipe(
    map(res => res.map(el => this.simplify(el)))
  );
  posts$: Observable<Post[]> = this.http.get<Post[]>(`${environment.backend}/Posts`).pipe(
    map(posts => posts.map(post => ({
      ...post,
      thumbnail$: this.createThumbnail(post),
      gallery: post.gallery && this.initMedia(post.gallery)
    })))
  );

  constructor(private http: HttpClient, private files: StaticFileService, private sanitizer: DomSanitizer) { }

  private simplify(post: Post): LatestPost {
    return {
      id: post.id,
      title: post.title,
      created: post.created,
      thumbnail$: this.createThumbnail(post)
    };
  }

  private initMedia(media: Omit<Media, "url$">[]) {
    return media.map(el => ({
      ...el,
      url$: this.files.get(`${environment.media}/${el.url}`).pipe(
        map(res => this.sanitizer.bypassSecurityTrustUrl(res))
      )
    }));
  }

  private createThumbnail(post: Post) {
    if(post.gallery && post.gallery[0]) {
      return this.files.get(`${environment.media}/${post.gallery[0].url}`).pipe(
        map(res => this.sanitizer.bypassSecurityTrustUrl(res))
      );
    } else {
      return of('assets/images/banner-1.jpg');
    }
  }
}
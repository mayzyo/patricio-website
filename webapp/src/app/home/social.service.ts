import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { components } from '../shared/backend.api';
import { LatestPost, Media, Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  latest$: Observable<LatestPost[]> = this.http.get<Post[]>(`${environment.backend}/Posts`).pipe(
    map(res => res
      .slice(0, 3)
      .map(el => this.simplify(el))
    )
  );
  posts$: Observable<Post[]> = this.http.get<Post[]>(`${environment.backend}/Posts`).pipe(
    map(posts => posts.map(post => ({
      ...post,
      thumbnail$: this.createThumbnail(post),
      gallery: post.gallery && {
        ...post.gallery,
        media: this.initMedia(post.gallery.media)
      }
    })))
  );

  constructor(private http: HttpClient, private staticFiles: StaticFileService, private sanitizer: DomSanitizer) { }

  private simplify(post: Post): LatestPost {
    return {
      id: post.id,
      title: post.title,
      created: post.created,
      thumbnail$: this.createThumbnail(post)
    };
  }

  private initMedia(media: Media[]) {
    return media.map(el => ({
      ...el,
      url$: this.staticFiles.get(`${environment.media}/${el.url}`).pipe(
        map(res => this.sanitizer.bypassSecurityTrustUrl(res))
      )
    }));
  }

  private createThumbnail(post: Post) {
    if(post.gallery) {
      return this.staticFiles.get(`${environment.media}/${post.gallery.media[0].url}`).pipe(
        map(res => this.sanitizer.bypassSecurityTrustUrl(res))
      );
    } else {
      return of('assets/images/banner-1.jpg');
    }
  }
}
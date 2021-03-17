import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { paths } from '../shared/backend.api';
import { BaseMedia, BasePost, SimplifiedPost, Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  readonly getArchivedPosts$ = new Subject<{ year: string | number, month: string | number }>();
  private archivedPosts$ = this.getArchivedPosts$.pipe(
    switchMap(res =>
      this.http.get<paths["/Posts/History/{year}/{month}"]["get"]["responses"][200]["text/plain"]>(
        `${environment.backend}/Posts/History/${res.year}/${res.month}`
      )
    )
  );

  readonly getAllPosts$ = new BehaviorSubject<null>(null);
  private readonly allPosts$ = this.getAllPosts$.pipe(
    switchMap(() =>
      this.http.get<paths["/Posts"]["get"]["responses"][200]["text/plain"]>(
        `${environment.backend}/Posts`
      )
    )
  );

  readonly posts$: Observable<Post[]> = merge(
    this.allPosts$,
    this.archivedPosts$
  ).pipe(
    map(res => res.map(el => this.createPostModel(el)))
  );

  readonly latest$: Observable<SimplifiedPost[]> = this.http.get<paths["/Posts/Event"]["get"]["responses"][200]["text/plain"]>(
    `${environment.backend}/Posts/Event`,
    { params: { size: "3" } }
  ).pipe(
    map(res => res.map(el => this.createSimplifiedPostModel(el)))
  );

  readonly archive$: Observable<Array<{ year: number, months: number[] }>> = this.http.get<paths["/Posts/History"]["get"]["responses"][200]["text/plain"]>(
    `${environment.backend}/Posts/History`,
  ).pipe(
    map(res => res.sort((a, b) => new Date(a.year, a.month) < new Date(b.year, b.month) ? 1 : -1)),
    map(res =>
      res.reduce((acc, cur) => {
        const prev = acc[acc.length - 1];
        if(prev && prev.year == cur.year) {
          prev.months.push(cur.month)
        } else {
          acc.push({ year: cur.year, months: [cur.month] })
        }
        return acc;
      }, new Array<{ year: number, months: number[] }>())
    )
  );

  constructor(private http: HttpClient, private files: StaticFileService, private sanitizer: DomSanitizer) { }

  private createPostModel(post: BasePost): Post {
    return {
      ...post,
      thumbnail$: this.createThumbnail(post),
      gallery: post.gallery ? post.gallery.map(el => this.createMediaModel(el)) : undefined
    }
  }

  private createSimplifiedPostModel(post: BasePost): SimplifiedPost {
    return {
      id: post.id,
      title: post.title,
      created: post.created,
      thumbnail$: this.createThumbnail(post)
    };
  }

  private createMediaModel(media: BaseMedia) {
    return {
      ...media,
      url$: this.files.get(`${environment.media}/${media.url}`).pipe(
        map(res => this.sanitizer.bypassSecurityTrustUrl(res))
      )
    };
  }

  private createThumbnail(post: BasePost) {
    if(post.gallery && post.gallery[0]) {
      return this.files.get(`${environment.media}/${post.gallery[0].url}`).pipe(
        map(res => this.sanitizer.bypassSecurityTrustUrl(res))
      );
    } else {
      return of('assets/images/banner-1.jpg');
    }
  }
}
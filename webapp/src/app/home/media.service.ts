import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { paths } from '../shared/backend.api';
import { BaseMedia, Media } from './models';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  readonly getList$ = new BehaviorSubject<Filter>(Filter.ALL);
  readonly list$ = this.getList$.pipe(
    switchMap(res =>
      this.http.get<paths["/Media"]["get"]["responses"][200]["text/plain"]>(
        `${environment.backend}/Media${res}`
      )
    ),
    map(res =>
      res.map(el => this.createMediaModel(el))
    )
  );
  readonly current$ = new BehaviorSubject<Media | null>(null);

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private staticFiles: StaticFileService) { }

  private createMediaModel(media: BaseMedia): Media {
    return {
      ...media,
      url$: this.staticFiles.get(media.url).pipe(
        map(url => this.sanitizer.bypassSecurityTrustUrl(url)),
        shareReplay()
      )
    };
  }
}

export enum Filter {
  ALL = '',
  PHOTOS = '/Image',
  VIDEOS = '/Video'
}
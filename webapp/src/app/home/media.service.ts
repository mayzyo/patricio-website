import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { Media } from './models';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  get$: Observable<Array<Media & { coverImage$: any }>> = this.http.get<Media[]>(`${environment.backend}/Media`).pipe(
    map(res => 
      res.map(el => ({ 
        ...el, 
        coverImage$: this.staticFiles.get('abc').pipe(
          map(url => this.sanitizer.bypassSecurityTrustUrl(url)),
          shareReplay()
        )
      }))
    ),
    shareReplay()
  );

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private staticFiles: StaticFileService) { }
}

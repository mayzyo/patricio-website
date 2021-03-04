import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { Song } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  highlights$: Observable<Song[]> = this.http.get<Song[]>(`${environment.backend}/Songs`);
  get$: Observable<Array<Song & { coverImage$: any }>> = this.http.get<Song[]>(`${environment.backend}/Songs`).pipe(
    map(res => res.map(el => ({ ...el, coverImage$: this.staticFiles.get('abc') }))),
    shareReplay()
  );

  constructor(private http: HttpClient, private staticFiles: StaticFileService) {
  }
}
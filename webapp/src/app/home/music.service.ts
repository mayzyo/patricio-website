import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { Song, TopSong } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  showcase$: Observable<Song[]> = this.http.get<TopSong[]>(`${environment.backend}/Songs/Top`).pipe(
    map(res => res.map(el => this.topSongToSong(el)))
  );
  list$: Observable<Array<Song & { coverImage$: any }>> = this.http.get<Song[]>(`${environment.backend}/Songs`).pipe(
    map(res => res.map(el => ({ ...el, coverImage$: this.files.get('abc') }))),
    shareReplay()
  );

  constructor(private http: HttpClient, private files: StaticFileService) {
  }

  get$(id: string) {
    return this.http.get<Song & { coverImage$: any }>(`${environment.backend}/Songs/${id}`).pipe(
      map(res => ({ ...res, coverImage$: this.files.get('abc') })),
    );
  }

  private topSongToSong(topSong: TopSong): Song {
    return {
      ...topSong.song,
      background$: topSong.song.album.coverImage 
        ? this.files.get(topSong.song.album.coverImage) 
        : of()
    }
  }
}
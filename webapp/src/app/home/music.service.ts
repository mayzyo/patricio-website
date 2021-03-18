import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { paths } from '../shared/backend.api';
import { Album, BaseAlbum, BaseSong, Song, TopSong } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  readonly showcase$: Observable<Song[]> = this.http.get<paths["/Songs/Top"]["get"]["responses"][200]["text/plain"]>(
    `${environment.backend}/Songs/Top`
  ).pipe(
    map(res => res.map(el => this.topSongToSong(el)))
  );
  readonly albums$: Observable<Album[]> = this.http.get<paths["/Albums"]["get"]["responses"][200]["text/plain"]>(
    `${environment.backend}/Albums`
  ).pipe(
    map(res  => res.map(el => this.createAlbum(el)))
  );
  readonly getSongs$ = new ReplaySubject<Album>();
  readonly songs$ = this.getSongs$.pipe(
    switchMap(res =>
      this.http.get<paths["/Albums/{id}"]["get"]["responses"][200]["text/plain"]>(
        `${environment.backend}/Albums/${res.id}`
      )
    ),
    map(res => res.songs.map(el => this.createSong(el, res)))
  );

  constructor(private http: HttpClient, private files: StaticFileService) {
  }

  get$(id: string) {
    return this.http.get<Song & { coverImage$: any }>(`${environment.backend}/Songs/${id}`).pipe(
      map(res => this.createSong(res, res.album)),
    );
  }

  private createAlbum(album: BaseAlbum): Album {
    return {
      ...album,
      coverImage$: album.coverImage 
        ? this.files.get(album.coverImage) 
        : of('assets/images/banner-1.jpg')
    };
  }

  private createSong(song: BaseSong, album: BaseAlbum): Song {
    return {
      ...song,
      coverImage$: album.coverImage 
        ? this.files.get(album.coverImage) 
        : of('assets/images/banner-1.jpg')
    }
  }

  private topSongToSong(topSong: TopSong): Song {
    return {
      ...topSong.song,
      genre: topSong.song.genre ? topSong.song.genre : topSong.song.album.genre,
      coverImage$: topSong.song.album.coverImage 
        ? this.files.get(topSong.song.album.coverImage) 
        : of()
    };
  }
}
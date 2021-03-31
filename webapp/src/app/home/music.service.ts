import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { paths } from '../shared/backend.api';
import { Album, BaseAlbum, BaseSong, Pagination, Song, TopSong } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  readonly showcase$: Observable<Song[]> = this.http.get<paths["/Songs/Top"]["get"]["responses"][200]["text/plain"]>(
    `${environment.backend}/Songs/Top`
  ).pipe(
    map(res => res.map(el => this.topSongToSong(el)))
  );
  readonly getAlbums$ = new Subject<Pagination>();
  readonly albums$: Observable<Album[]> = this.getAlbums$.pipe(
    switchMap(res => this.http.get<paths["/Albums"]["get"]["responses"][200]["text/plain"]>(
      `${environment.backend}/Albums`,
      { params: { ...res } }
    )),
    map(res  => res.map(el => this.createAlbum(el))),
    share()
  );

  readonly getSongs$ = new Subject<Album>();
  readonly songs$ = this.getSongs$.pipe(
    switchMap(res =>
      this.http.get<paths["/Albums/{id}"]["get"]["responses"][200]["text/plain"]>(
        `${environment.backend}/Albums/${res.id}`
      )
    ),
    map(res => res.songs.map(el => this.createSong(el, res))),
    share()
  );

  constructor(protected http: HttpClient, protected sanitizer: DomSanitizer, protected files: StaticFileService) {
  }

  get$(id: string) {
    return this.http.get<paths["/Songs/{id}"]["get"]["responses"][200]["text/plain"]>(
      `${environment.backend}/Songs/${id}`
    ).pipe(
      map(res => this.createSong(res, res.album)),
    );
  }

  protected createAlbum(album: BaseAlbum): Album {
    return {
      ...album,
      songs: [],
      coverImage$: album.coverImage 
        ? this.files.get(album.coverImage) 
        : of('assets/images/banner-1.jpg')
    };
  }

  protected createSong(song: BaseSong, album: BaseAlbum): Song {
    return {
      ...song,
      genre: song.genre ? song.genre : album.genre,
      coverImage$: album.coverImage 
        ? this.files.get(album.coverImage) 
        : of('assets/images/banner-1.jpg'),
      audio$: song.audio 
        ? this.files.get(song.audio).pipe(
            map(res => this.sanitizer.bypassSecurityTrustUrl(res))
          ) 
        : undefined
    }
  }

  protected topSongToSong(topSong: TopSong): Song {
    return {
      ...topSong.song,
      genre: topSong.song.genre ? topSong.song.genre : topSong.song.album.genre,
      coverImage$: topSong.song.album.coverImage 
        ? this.files.get(topSong.song.album.coverImage) 
        : of()
    };
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Album, Song } from '../models';

// This component exists because nesting SwiperJS in Angular in the same component creates
// ExpressionChangeAfter error.
@Component({
  selector: 'app-music-gallery-songs',
  templateUrl: './music-gallery-songs.component.html',
  styleUrls: ['./music-gallery-songs.component.scss']
})
export class MusicGallerySongsComponent implements OnInit {
  @Input() album!: Readonly<Album & { songs: Song[] }>;
  // @Input() songs$!: Observable<Song[]>;
  // @Input() activeAlbum$!: Observable<Album>;
  // currentSongs$?: Observable<any[]>;
  // isActive$?: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
    // this.currentSongs$ = this.activeAlbum$.pipe(
    //   switchMap(res => res.id == this.album.id ? this.songs$ : of(this.album.songs).pipe(map(x => x.map(el => ({ ...el, coverImage$: this.album.coverImage$ }))))),
    //   // skipWhile(res => res.id != this.album.id),
    //   // switchMapTo(this.songs$),
    // );

    // this.isActive$ = this.activeAlbum$.pipe(
    //   map(res => res.id == this.album.id)
    // )
  }
}

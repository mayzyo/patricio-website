import { Component, OnInit, Input } from '@angular/core';
import { skipWhile } from 'rxjs/operators';
import { Album } from '../models';
import { MusicService } from '../music.service';

// This component exists because nesting SwiperJS in Angular in the same component creates
// ExpressionChangeAfter error.
@Component({
  selector: 'app-music-gallery-songs',
  templateUrl: './music-gallery-songs.component.html',
  styleUrls: ['./music-gallery-songs.component.scss']
})
export class MusicGallerySongsComponent implements OnInit {
  @Input() album!: Readonly<Album>;
  @Input() current!: Readonly<Album>;
  readonly songs$ = this.musics.songs$.pipe(
    skipWhile(() => this.current.id != this.album.id)
  );

  constructor(public musics: MusicService) { }

  ngOnInit(): void {
  }
}

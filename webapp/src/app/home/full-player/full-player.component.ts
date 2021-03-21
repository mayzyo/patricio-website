import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import metaData from 'src/meta-data';
import { Song } from '../models';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-full-player',
  templateUrl: './full-player.component.html',
  styleUrls: ['./full-player.component.scss']
})
export class FullPlayerComponent implements OnInit {
  readonly backgroundUrl: string = `--bg: url(${metaData.discographyBannerUrl})`;
  readonly song$: Observable<Song> = this.route.paramMap.pipe(
    switchMap(params => this.musics.get$(params.get('id') || ''))
  );

  constructor(private route: ActivatedRoute, private musics: MusicService) { }

  ngOnInit(): void {
  }
}

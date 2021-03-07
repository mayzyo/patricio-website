import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import metaData from 'src/meta-data';
import { Song } from '../models';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-player-banner',
  templateUrl: './player-banner.component.html',
  styleUrls: ['./player-banner.component.scss']
})
export class PlayerBannerComponent implements OnInit {
  readonly backgroundUrl: string = `--bg: url(${metaData.discographyBannerUrl})`;

  song$: Observable<Song & { coverImage$: any }> = this.route.paramMap.pipe(
    switchMap(params => this.music.get$(params.get('id') || ''))
  );

  constructor(private route: ActivatedRoute, private music: MusicService) { }

  ngOnInit(): void {
  }
}

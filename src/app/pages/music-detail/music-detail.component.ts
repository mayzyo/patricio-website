import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, share } from 'rxjs/operators';
import { MusicService } from 'src/app/services/music.service';
import { Music } from 'src/app/models/Music';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {
  readonly music$ = this.route.paramMap.pipe(
    map(res => Number(res.get('id'))),
    switchMap(res => this.musics.select$(res)),
    share()
  );
  
  constructor(
    private route: ActivatedRoute,
    private musics: MusicService,
  ) { }

  ngOnInit() {
  }

  redirect(music: Music) {
    window.open(music.soundCloud, '_blank');
  }
}

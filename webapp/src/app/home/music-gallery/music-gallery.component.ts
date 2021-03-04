import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import metaData from 'src/meta-data';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.scss']
})
export class MusicGalleryComponent implements OnInit {
  readonly backgroundUrl: string = `--bg: url(${metaData.discographyBannerUrl})`;

  breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver, public musics: MusicService) { }

  ngOnInit(): void {
  }

}

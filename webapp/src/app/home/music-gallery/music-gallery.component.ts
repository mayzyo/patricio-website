import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import metaData from 'src/meta-data';
import { Album } from '../models';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.scss']
})
export class MusicGalleryComponent implements OnInit, OnDestroy {
  readonly backgroundUrl: string = `--bg: url(${metaData.discographyBannerUrl})`;
  readonly breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );
  currentAlbum?: Album = undefined;
  private albums?: Album[];
  private readonly subscriptions = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver, public musics: MusicService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.musics.albums$.subscribe(res => this.albums = res)
    );
    this.subscriptions.add(
      combineLatest([
        this.breakpoint$,
        this.musics.albums$
      ]).subscribe(res => {
        if(res[0] == false && res[1]) {
          this.currentAlbum = res[1][0];
          this.musics.getSongs$.next(res[1][0]);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectAlbum(e: Album) {
    this.currentAlbum = e;
    this.musics.getSongs$.next(e);
  }

  activeIndexChange(e: any): any {
    if(this.albums) {
      this.currentAlbum = this.albums[e.activeIndex];
      this.musics.getSongs$.next(this.albums[e.activeIndex]);
    }
  }
}

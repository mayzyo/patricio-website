import { transition, trigger, useAnimation } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, merge, Observable, of, Subject, Subscription } from 'rxjs';
import { map, scan, share, switchMapTo } from 'rxjs/operators';
import metaData from 'src/meta-data';
import { Album, Song } from '../models';
import { MusicService } from '../music.service';
import { pressDownAnimation } from '../press-down.animation';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { clearWhen, sequence } from 'src/app/utils/custom-operators';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.scss'],
  animations: [
    trigger('pressDown', [
      transition('void => *', [useAnimation(pressDownAnimation)])
    ])
  ],
})
export class MusicGalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly faAngleDoubleLeft = faAngleDoubleLeft;
  readonly backgroundUrl: string = `--bg: url(${metaData.discographyBannerUrl})`;
  readonly isMobile$ = merge(
    of(this.breakpointObserver.isMatched('(max-width: 1023px)')),
    this.breakpointObserver.observe('(max-width: 1023px)').pipe(
      map(res => res.matches)
    )
  );
  readonly activeIndex$ = new Subject<number>();
  readonly delayedAlbums$: Observable<Album[]> = this.musics.albums$.pipe(
    sequence(100, this.musics.albums$),
    scan((acc, cur) => [...acc, cur], new Array<Album>()),
    clearWhen(this.musics.getSongs$)
  );
  readonly delayedSongs$: Observable<Song[]> = this.musics.songs$.pipe(
    sequence(100, this.musics.songs$), 
    scan((acc, cur) => [...acc, cur], new Array<Song>()),
    clearWhen(this.musics.getAlbums$)
  );
  readonly albumWithSongs$: Observable<Array<Album & { songs: Song[] }>> = combineLatest([
    // this.musics.getSongs$,
    merge(of(0), this.activeIndex$),
    this.musics.albums$,
    this.musics.songs$
  ]).pipe(
    scan((acc, cur) => {
      acc.forEach((el, i) => cur[1][i].songs = el.songs);
      // const albumId = cur[0].id || 0;
      // const album = cur[1].find(el => el.id == albumId) || { songs: undefined };
      // album.songs = cur[2];
      cur[1][cur[0]].songs = cur[2];
      console.log('test', acc)
      return cur[1] as Array<Album & { songs: Song[] }>;
    }, new Array<Album & { songs: Song[] }>()),
    share()
  );
  // readonly activeAlbum$ = new ReplaySubject<Album>();
  private readonly subscriptions = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver, public musics: MusicService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.isMobile$,
        merge(of(0), this.activeIndex$),
        this.musics.albums$
      ]).subscribe(res => {
        if(res[0] && res[2] && res[2].length != 0) {
          this.selectAlbum(res[2][res[1]]);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.musics.getAlbums$.next({ page: '1', size: '10' });
  }

  selectAlbum(e: Album) {
    // this.activeAlbum$.next(e);
    this.musics.getSongs$.next(e);
  }

  backToAlbum(): void {
    this.musics.getAlbums$.next({ page: '1', size: '10' });
  }

  activeIndexChange(e: any) {
    this.activeIndex$.next(e.activeIndex)
  }
}

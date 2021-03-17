import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { from, interval, merge, Observable, of, zip } from 'rxjs';
import { map, pluck, reduce, scan, share, shareReplay, skip, switchMap, take, tap } from 'rxjs/operators';
import { MusicService } from '../music.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Song } from '../models';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  @Input() animTrigger$?: Observable<void>;
  @HostBinding('style.display') private display: string = 'block';

  oversizeItem$?: Observable<Song>;
  largeItem$?: Observable<Song>;
  wideItems$?: Observable<Song[]>;
  items$?: Observable<Song[]>;
  hover?: Song;

  breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );

  constructor(private musics: MusicService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.animTrigger$ = of();
    if(this.animTrigger$) {
      this.initCollection(this.animTrigger$);
    }
  }

  private initCollection(animTrigger$: Observable<void>) {
    var collection$ = this.musics.showcase$.pipe(
      tap(res => this.display = res.length == 0 ? 'none' : 'block'),
      switchMap(res => from(res)),
      shareReplay()
    );

    // var collection$ = zip(
    //   datasource$,
    //   animTrigger$.pipe(
    //     take(1),
    //     switchMap(() => merge(of(null), interval(600)))
    //   )
    // ).pipe(
    //   pluck('0'),
    //   // tap(res => this.entryFade(res)),
    //   share()
    // );

    this.oversizeItem$ = collection$.pipe(
      take(1)
    );
    this.largeItem$ = collection$.pipe(
      skip(1),
      take(1),
    );
    this.wideItems$ = collection$.pipe(
      skip(2),
      scan<Song, Song[]>((acc, cur) => [...acc, cur], []),
      take(3),
    );
    this.items$ = collection$.pipe(
      skip(5),
      scan<Song, Song[]>((acc, cur) => [...acc, cur], []),
      take(4)
    );
  }
}
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, scan, share, skip, take, tap } from 'rxjs/operators';
import { MusicService } from '../music.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Song } from '../models';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideInAnimation } from '../slide-in.animation';
import { sequence } from 'src/app/utils/custom-operators';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('void => *', [useAnimation(slideInAnimation)])
    ])
  ],
})
export class ShowcaseComponent implements OnInit {
  @Input() animate$!: Observable<void>;
  @HostBinding('style.display') private display: string = 'block';

  oversizeItem$?: Observable<Song>;
  largeItem$?: Observable<Song>;
  wideItems$?: Observable<Song[]>;
  items$?: Observable<Song[]>;
  hover?: Song;

  readonly breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );

  constructor(private musics: MusicService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    var collection$ = this.musics.showcase$.pipe(
      tap(res => this.display = res.length == 0 ? 'none' : 'block'),
      sequence(100, combineLatest([this.animate$, this.musics.showcase$])),
      share()
    );

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
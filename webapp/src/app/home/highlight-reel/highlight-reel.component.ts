import { Component, Input, OnInit } from '@angular/core';
import { from, interval, merge, Observable, of, zip } from 'rxjs';
import { map, pluck, reduce, scan, share, skip, switchMap, take, tap } from 'rxjs/operators';
import { MusicService } from '../music.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-highlight-reel',
  templateUrl: './highlight-reel.component.html',
  styleUrls: ['./highlight-reel.component.scss']
})
export class HighlightReelComponent implements OnInit {
  @Input() animTrigger$?: Observable<void>;

  oversizeItem$?: Observable<Touchable>;
  largeItem$?: Observable<Touchable>;
  wideItems$?: Observable<Touchable[]>;
  items$?: Observable<Touchable[]>;
  hover?: Touchable;

  breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)');

  constructor(private musics: MusicService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.animTrigger$ = of();
    if(this.animTrigger$) {
      this.initCollection(this.animTrigger$);
    }
  }

  breakpointChanged(state: BreakpointState | null) {
    return state != null && state.matches;
  }

  private initCollection(animTrigger$: Observable<void>) {
    var collection$ = this.musics.highlights$.pipe(
      switchMap(res => 
        from(
          res.map(el => ({ title: el.title, subtitle: el.genre, backgroundUrl: 'assets/images/banner-1.jpg' }))
        )
      ),
      share()
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
      scan<Touchable, Touchable[]>((acc, cur) => [...acc, cur], []),
      take(3),
    );
    this.items$ = collection$.pipe(
      skip(5),
      scan<Touchable, Touchable[]>((acc, cur) => [...acc, cur], []),
      take(4)
    );
  }
}

interface Touchable {
  title?: string,
  subtitle: string | undefined | null,
  backgroundUrl?: string
}
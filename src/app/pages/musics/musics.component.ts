import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, zip, from, interval, combineLatest } from 'rxjs';
import { map, scan, tap, switchMap, pluck } from 'rxjs/operators';
import { Music } from 'src/app/models/Music';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit, OnDestroy {
  State = State;
  readonly subs = new Subscription();
  readonly quote$ = this.quotes.unique$('music');

  readonly musics$ = combineLatest(
    this.musics.results$,
    this.musics.current$
  ).pipe(
    map(res => [res[0].filter(el => res[1].indexOf(el) == -1), res[1]]),
    tap(res => this.more = res[1].length % 8 == 0),
    switchMap(res => zip(from(res[1]), interval(300)).pipe(
      pluck('0'),
      tap((x: any) => {
        x.state = State.INACTIVE;
        x.date = x.date.toDateString()
      }),
      // map(x => ({ ...x, state: State.INACTIVE, date: x.date.toDateString() })),
      scan<unknown, unknown[]>((acc, cur) => acc.concat(cur), res[0]),
    )),
  )

  // readonly musics$ = merge(
  //   of(null),
  //   this.resetResult$.pipe(
  //     tap(() => this.musics.toPage(1))
  //   )
  // ).pipe(
  //   switchMap(() => this.musics.result$.pipe(
  //     tap(res => this.more = res.length % 8 == 0),
  //     switchMap(res => zip(
  //       from(res),
  //       interval(300)
  //     ).pipe(
  //       pluck('0'),
  //       // map(x => ({ ...x, state: State.INACTIVE, date: x.date.toDateString() })),
  //     )),
  //     scan<any>((acc, cur) => acc.concat(cur), []),
  //   )),
  //   // withLatestFrom(this.musics.onPageChange$()),
  //   // scan<[Music[], number], Music[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), []),
  // );
  // readonly musics$ = this.musics.onPageChange$().pipe(
  //   switchMap(() => this.musics.result$.pipe(
  //     map(res => ({ ...res, state: State.INACTIVE, date: res.date.toDateString() })),
  //     rapidFire(300),
  //   )),
  //   scan<unknown, unknown[]>((acc, cur) => [ ...acc, cur ], []),
  //   tap(res => this.more = res.length % 8 == 0),
  // );

  // A list of music that is currently loading.
  loading = new Map<string, Music & { state: State }>();
  hover: Music & { state: State };
  playing: any;
  more: boolean;

  constructor(
    private quotes: QuotesService,
    private musics: MusicService,
    private admin: AdminService,
  ) { }

  resetTest() {
    this.musics.toPage(1);
  }

  ngOnInit() {
    this.subs.add(
      this.musics.onAudio$.subscribe(res => {
        const music = this.loading.get(res);
        if (music) {
          music.state = State.PLAYING;
          this.loading.delete(res);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  hoverStyle(music: Music & { state: State }) {
    if (music.state != State.INACTIVE) {
      return 'opacity(.5) blur(5px)';
    } else if (this.hover == music) {
      return '';
    } else {
      return 'opacity(.5)';
    }
  }

  onMouseLeave() {
    this.hover.state == State.ACTIVE && (this.hover.state = State.INACTIVE);
    this.hover = null;
  }

  onPlay($event: Event) {
    if (this.playing && $event.target != this.playing) {
      this.playing.pause()
    }
    this.playing = $event.target;
  }

  activate(music: Music & { state: State }) {
    if (music.soundCloud || music.audioKey) {
      music.state = State.ACTIVE;
    }
  }

  play(music: Music & { state: State }) {
    music.state = State.LOADING;
    this.loading.set(music.audioKey, music);
  }

  showMore() {
    this.more = false;
    this.musics.next();
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}

enum State {
  INACTIVE,
  ACTIVE,
  LOADING,
  PLAYING
}

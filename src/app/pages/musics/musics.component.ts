import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, scan, tap, switchMap } from 'rxjs/operators';
import { Music } from 'src/app/models/Music';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { rapidFire } from 'src/app/utils/custom-operators';
import { MusicService } from 'src/app/services/music.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit, OnDestroy {
  State = State;
  readonly subs = new Subscription();
  readonly quote$ = this.quotes.unique$('music');
  readonly musics$ = this.musics.onPageChange$().pipe(
    switchMap(() => this.musics.result$.pipe(
      map(res => ({ ...res, state: State.INACTIVE, date: res.date.toDateString() })),
      rapidFire(300),
    )),
    scan<unknown, unknown[]>((acc, cur) => [ ...acc, cur ], []),
    tap(res => this.more = res.length % 8 == 0),
  );
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

  ngOnInit() {
    this.subs.add(
      this.musics.audio$.subscribe(res => {
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
    if(this.playing && $event.target != this.playing) {
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

  redirect(music: Music) {
    window.open(music.soundCloud, '_blank');
  }

  back(music: Music & { state: State }) {
    music.state = State.INACTIVE;
    this.loading.delete(music.audioKey);
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

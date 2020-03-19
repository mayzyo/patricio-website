import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { Music } from 'src/app/models/Music';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { MusicService } from 'src/app/services/music.service';
import { delayInterval } from 'src/app/utils/custom-operators';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit, OnDestroy {
  State = State;
  readonly subs = new Subscription();
  readonly quote$ = this.quotes.unique$('music');

  readonly musics$ = this.musics.results$.pipe(
    map(res => res.map(el => ({ ...el, state: State.INACTIVE, date: el.date.toDateString() }))), // Assign State to each object.
    scan<any[] | null, [unknown[], unknown[]]>((acc, cur) => 
      [acc[1], cur.filter(el => !acc[1].find(x => (x as any).id == el.id))], 
      [[], []]
    ), // Filter out the objects that exists in the previous state and outputing the [previous total, new objects].
    switchMap(res => from(res[1]).pipe(
      delayInterval(300),
      scan<unknown, unknown[]>((acc, cur) => acc.concat(cur), res[0]),
    )),
  );

  // A list of music that is currently loading.
  loading = new Map<string, Music & { state: State }>();
  displayStates = new Map<string, State>();
  hover: Music & { state: State };
  playing: any;
  get More() {
    return !this.musics.EndReached;
  }

  constructor(
    private quotes: QuotesService,
    private musics: MusicService,
    private admin: AdminService,
  ) { }

  ngOnInit() {
    this.subs.add(
      this.musics.onAudioLoad$.subscribe(res => {
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
    this.musics.load();
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

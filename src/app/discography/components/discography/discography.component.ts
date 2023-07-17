import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { PlayerState } from '../../enums/player-state';
import { QuotesService } from 'src/app/home/services/quotes.service';
import { MusicService } from 'src/app/home/services/music.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { delayInterval } from 'src/app/shared/operators/delay-interval';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { MusicAsync } from 'src/app/home/classes/music-async';

@Component({
    selector: 'app-discography',
    templateUrl: './discography.component.html',
    styleUrls: ['./discography.component.scss']
})
export class DiscographyComponent implements OnInit, OnDestroy, AfterViewInit {
    protected readonly faEdit = faEdit;
    protected readonly PlayerState = PlayerState;
    protected readonly subs = new Subscription();
    protected readonly quote$ = this.quotes.unique$('music');

    protected readonly songs$ = this.musics.list$.pipe(
        map(res => res.map(el => ({ ...el, state: PlayerState.INACTIVE, date: el.date.toDateString() }))), // Assign State to each object.
        scan<any[], [unknown[], unknown[]]>((acc, cur) =>
            [acc[1], cur.filter(el => !acc[1].find(x => (x as any).id == el.id))],
            [[], []]
        ), // Filter out the objects that exists in the previous state and outputing the [previous total, new objects].
        switchMap(res => from(res[1]).pipe(
            delayInterval(300),
            scan<unknown, Array<MusicAsync & { state: PlayerState }>>((acc, cur) => acc.concat(cur as MusicAsync & { state: PlayerState }), res[0] as Array<MusicAsync & { state: PlayerState }>),
        )),
    );

    // A list of music that is currently loading.
    loading = new Map<string, MusicAsync & { state: PlayerState }>();
    displayStates = new Map<string, PlayerState>();
    hover: MusicAsync & { state: PlayerState } | null = null;
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
                    music.state = PlayerState.PLAYING;
                    this.loading.delete(res);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.musics.refresh();
    }

    hoverStyle(music: MusicAsync & { state: PlayerState }) {
        if (music.state != PlayerState.INACTIVE) {
            return 'opacity(.5) blur(5px)';
        } else if (this.hover == music) {
            return '';
        } else {
            return 'opacity(.5)';
        }
    }

    onMouseLeave() {
        this.hover?.state == PlayerState.ACTIVE && (this.hover.state = PlayerState.INACTIVE);
        this.hover = null;
    }

    onPlay($event: Event) {
        if (this.playing && $event.target != this.playing) {
            this.playing.pause()
        }
        this.playing = $event.target;
    }

    activate(song: MusicAsync & { state: PlayerState }) {
        if (song.soundCloud || song.audioKey) {
            song.state = PlayerState.ACTIVE;
        }
    }

    play(song: MusicAsync & { state: PlayerState }) {
        song.state = PlayerState.LOADING;
        this.loading.set(song.audioKey, song);
    }

    back(song: MusicAsync & { state: PlayerState }) {
        throw new Error("Not Implemented!");
    }

    redirect(song: MusicAsync & { state: PlayerState }) {
        throw new Error("Not Implemented!");
    }

    showMore() {
        this.musics.load();
    }

    loggedIn = this.admin.loggedIn;
    edit(editorType: string) {
        this.admin.open(editorType);
    }
}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { generateSongs } from '../../../../test/generators/song';
import { BacklogView } from '../../interfaces/backlog-view';
import { PlayerState } from '../../enums/player-state';
import { faCircleInfo, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { MusicPlayerService } from '../../services/music-player.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-song-backlog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './song-backlog.component.html',
    styleUrl: './song-backlog.component.scss',
    providers: [MusicPlayerService]
})
export class SongBacklogComponent {
    protected readonly faCircleInfo = faCircleInfo;
    protected readonly faCirclePlay = faCirclePlay;
    protected readonly faSoundcloud = faSoundcloud;
    protected readonly PlayerState = PlayerState;

    protected readonly songs$ = this.initialiseSongs();
    protected readonly loading$ = this.musicPlayer.loading$;
    protected readonly hoverTarget = signal<BacklogView | null>(null);
    protected readonly playerTarget = signal<BacklogView | null>(null);
    protected readonly audio = signal<any | null>(null);
    protected readonly more = signal(true);

    constructor(private musicPlayer: MusicPlayerService) {
        this.musicPlayer.audio$.pipe(takeUntilDestroyed()).subscribe(res => {
            console.log('audio', res)
            this.audio.set(res);
        });
    }

    activate(song: BacklogView): void {
        if (song.soundCloud || song.audioId) {
            song.state = PlayerState.ACTIVE;
        }
    }

    play(song: BacklogView): void {
        console.log('here', song)
        this.playerTarget.set(song);
        this.musicPlayer.loadAudio(song.audioId);
    }

    back(song: BacklogView): void {
        throw new Error("Not Implemented!");
    }

    redirect(song: BacklogView): void {
        throw new Error("Not Implemented!");
    }

    showMore(): void {
        // this.musics.load();
    }

    protected buildImage(thumbnail: string, coverId: string): Observable<any> {
        return of(thumbnail);
    }

    private initialiseSongs(): Observable<BacklogView[]> {
        return of(generateSongs()).pipe(
            switchMap(res => from(res)),
            map(res => ({ ...res, url: `/discography/${res.id}`, state: PlayerState.INACTIVE })),
            scan((acc, curr) => [...acc, curr], new Array<BacklogView>()),
        );
    }
}

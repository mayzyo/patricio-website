import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';
import { faCircleInfo, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { BacklogView } from '../../interfaces/backlog-view';
import { MusicPlayerService } from '../../services/music-player.service';
import { SongService } from '../../../shared/services/song.service';
import { ContentService } from '../../../shared/services/content.service';

@Component({
    selector: 'app-song-gallery',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './song-gallery.component.html',
    styleUrl: './song-gallery.component.scss',
    providers: [MusicPlayerService],
    host: { class: 'container' }
})
export class SongGalleryComponent {
    protected readonly faCircleInfo = faCircleInfo;
    protected readonly faCirclePlay = faCirclePlay;
    protected readonly faSoundcloud = faSoundcloud;

    protected readonly songs$ = this.initialiseSongs();
    protected readonly loading$ = this.musicPlayer.loading$;
    protected readonly endReached$ = this.song.endReached$.pipe(startWith(true));
    protected readonly hoverTarget = signal<BacklogView | null>(null);
    protected readonly playerTarget = signal<BacklogView | null>(null);
    protected readonly audio = signal<any | null>(null);

    constructor(private song: SongService, private musicPlayer: MusicPlayerService, private content: ContentService) {
        this.respondToMusicPlayerAudio();
    }

    play(song: BacklogView): void {
        this.playerTarget.set(song);
        this.musicPlayer.loadAudio(song.audioId);
    }

    cancelLoad(): void {
        this.playerTarget.set(null);
    }

    showMore(): void {
        this.song.load();
    }

    private respondToMusicPlayerAudio(): void {
        this.musicPlayer.audio$.pipe(takeUntilDestroyed()).subscribe(res => this.audio.set(res));
    }

    private initialiseSongs(): Observable<BacklogView[]> {
        return this.song.list$.pipe(
            switchMap(res => from(res)),
            map(res => ({
                ...res,
                cover$: this.content.getImage(res.thumbnail, res.coverId)
            })),
            scan((acc, curr) => [...acc, curr], new Array<BacklogView>()),
        );
    }
}

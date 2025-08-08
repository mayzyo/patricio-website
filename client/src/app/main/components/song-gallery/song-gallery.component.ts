import { Component, DestroyRef, inject, Injector, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';
import { faCircleInfo, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faApple, faSoundcloud, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { BacklogView } from '../../interfaces/backlog-view';
import { MusicPlayerService } from '../../services/music-player.service';
import { SongService } from '../../../shared/services/song.service';
import { ContentService } from '../../../shared/services/content.service';
import { delayInterval } from '../../../shared/operators/delay-interval';

@Component({
    selector: 'app-song-gallery',
    templateUrl: './song-gallery.component.html',
    styleUrl: './song-gallery.component.scss',
    providers: [MusicPlayerService],
    host: { class: 'container' },
    standalone: false
})
export class SongGalleryComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private song = inject(SongService);
    private musicPlayer = inject(MusicPlayerService);
    private content = inject(ContentService);

    protected readonly faCircleInfo = faCircleInfo;
    protected readonly faCirclePlay = faCirclePlay;
    protected readonly faSoundcloud = faSoundcloud;
    protected readonly faApple = faApple;
    protected readonly faSpotify = faSpotify;

    protected readonly songs$ = this.initialiseSongsAnimated();
    protected readonly loading$ = this.musicPlayer.loading$;
    protected readonly endReached$ = this.song.endReached$.pipe(startWith(true));
    protected readonly hoverTarget = signal<BacklogView | null>(null);
    protected readonly playerTarget = signal<BacklogView | null>(null);
    protected readonly audio = signal<any | null>(null);

    ngOnInit(): void {
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
        this.musicPlayer.audio$.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => this.audio.set(res));
    }

    private initialiseSongsAnimated(): Observable<BacklogView[]> {
        return this.song.list$.pipe(
            switchMap(res => from(res).pipe(
                map(res => ({
                    ...res,
                    cover$: this.content.getImage(res.thumbnail, res.coverId)
                })),
                delayInterval(),
                scan((acc, curr) => [...acc, curr], new Array<BacklogView>()),
            ))
        );
    }
}

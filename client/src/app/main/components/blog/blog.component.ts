import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';
import { faBilibili, faSoundcloud, faVimeoV, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { SongService } from '../../../shared/services/song.service';
import { Blog } from '../../../models/blog';
import { BlogSongView } from '../../interfaces/blog-song-view';
import { ContentService } from '../../../shared/services/content.service';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
    selector: 'app-blog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    providers: [MusicPlayerService]
})
export class BlogComponent {
    private readonly _id = signal<string | null>(null);
    @Input() set id(value: string) {
        this._id.set(value);
    }

    private readonly _songId = signal<string | null>(null);
    @Input() set songId(value: string) {
        this._songId.set(value);
    }

    protected readonly faSoundcloud = faSoundcloud;
    protected readonly faYoutube = faYoutube;
    protected readonly faVimeoV = faVimeoV;
    protected readonly faBilibili = faBilibili;

    protected readonly song$ = this.initialiseSong();
    protected readonly blog$ = this.initialiseBlog();
    protected readonly loading$ = this.musicPlayer.loading$;
    protected readonly audio = signal<any | null>(null);

    constructor(
        private sanitizer: DomSanitizer,
        private song: SongService,
        private content: ContentService,
        private musicPlayer: MusicPlayerService
    ) {
        this.respondToMusicPlayerAudio();
    }

    private respondToMusicPlayerAudio(): void {
        this.musicPlayer.audio$.pipe(takeUntilDestroyed()).subscribe(res => this.audio.set(res));
    }

    private initialiseSong(): Observable<BlogSongView | undefined> {
        return toObservable(this._songId).pipe(
            filter(id => id != null),
            switchMap(selectedId => this.song.list$.pipe(
                map(songs => songs.find(({ id }) => id == selectedId))
            )),
            map(song => ({
                ...song,
                cover$: this.content.getImage(song?.thumbnail, song?.coverId),
                youtubeSanitized: song?.youtube ? this.sanitizer.bypassSecurityTrustResourceUrl(song?.youtube) : '',
                vimeoSanitized: song?.vimeo ? this.sanitizer.bypassSecurityTrustResourceUrl(song?.vimeo) : '',
                bilibiliSanitized: song?.bilibili ? this.sanitizer.bypassSecurityTrustResourceUrl(song?.bilibili) : ''
            }) as BlogSongView),
            tap(({ audioId, youtube, vimeo, bilibili }) => youtube || vimeo || bilibili || this.musicPlayer.loadAudio(audioId)),
            share()
        );
    }

    private initialiseBlog(): Observable<Blog> {
        return toObservable(this._id).pipe(
            filter(id => id != null && id != '0'),
            switchMap(selectedId => {
                console.error('Blog not yet implemented');
                return EMPTY;
                // return generateBlog();
            })
        )
    }
}

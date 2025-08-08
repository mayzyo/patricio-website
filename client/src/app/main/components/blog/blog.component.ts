import { Component, input, Input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';
import { faApple, faBilibili, faSoundcloud, faSpotify, faVimeoV, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { SongService } from '../../../shared/services/song.service';
import { Blog } from '../../../models/blog';
import { BlogSongView } from '../../interfaces/blog-song-view';
import { ContentService } from '../../../shared/services/content.service';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    providers: [MusicPlayerService],
    standalone: false
})
export class BlogComponent {
    id = input<string | null>();
    songId = input<string | null>();

    protected readonly faSoundcloud = faSoundcloud;
    protected readonly faApple = faApple;
    protected readonly faSpotify = faSpotify;
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
        return toObservable(this.songId).pipe(
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
        return toObservable(this.id).pipe(
            filter(id => id != null && id != '0'),
            switchMap(selectedId => {
                console.error('Blog not yet implemented');
                return EMPTY;
                // return generateBlog();
            })
        )
    }
}

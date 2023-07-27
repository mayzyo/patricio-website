import { Observable, of, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Music } from "src/app/models/music";
import { Article } from "src/app/models/article";
import { SafeUrl } from '@angular/platform-browser';
import { ContentService } from '../services/content.service';
import { MusicService } from '../services/music.service';

export class MusicAsync {
    id: string;
    title: string;
    genre: string;
    date: Date;
    thumbnail: string;
    soundCloud: string;
    coverKey: string;
    audioKey: string;
    favourite: boolean;
    articleId: number;
    article: Article;
    audio$: Observable<SafeUrl>;
    cover$: Observable<string | SafeUrl>;

    constructor(ob: Music, musics: MusicService, contents: ContentService) {
        this.id = ob.id;
        this.title = ob.title;
        this.genre = ob.genre;
        this.thumbnail = ob.thumbnail;
        this.soundCloud = ob.soundCloud;
        this.coverKey = ob.coverKey;
        this.audioKey = ob.audioKey;
        this.favourite = ob.favourite;
        this.articleId = ob.articleId;
        this.article = ob.article;
        this.id = ob.id;
        this.date = ob.date.toDate();

        this.audio$ = contents.get(ob.audioKey).pipe(
            tap(() => musics.onAudioLoad$.next(ob.audioKey))
        );
        
        this.cover$ = merge(
            of(ob.thumbnail),
            contents.get(ob.coverKey)
        );
    }
}
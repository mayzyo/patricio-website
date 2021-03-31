import { moduleMetadata, Story } from '@storybook/angular';
import { MusicGalleryComponent } from './music-gallery.component';
import { SwiperModule } from 'swiper/angular';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { of, Subject } from 'rxjs';
import { Album } from '../models';
import { MusicGallerySongsComponent } from '../music-gallery-songs/music-gallery-songs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlbumCoverComponent } from '../album-cover/album-cover.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockModelProvider } from 'src/app/core/mock-model.interceptor';
import { StaticFileService } from 'src/app/core/static-file.service';
import { MusicService } from '../music.service';
import { map, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export default {
    title: 'Home/Music Gallery',
    decorators: [
        moduleMetadata({
            declarations: [MusicGalleryComponent, MusicGallerySongsComponent, AlbumCoverComponent, QuickPlayerComponent],
            imports: [BrowserAnimationsModule, HttpClientModule, RouterTestingModule, SwiperModule, FontAwesomeModule],
            providers: [MockModelProvider]
        }),
    ]
};

const Template: Story<Album & { songTitle: string, songAudio: string, count: number }> = args => {
    class MockStaticFileService implements Partial<StaticFileService> {
        get(fileName: string) {
            return of('assets/images/banner-1.jpg');
        }
    }

    return {
        moduleMetadata: {
            providers: [
                // { provide: MusicService, useClass: MockMusicService },
                { provide: StaticFileService, useClass: MockStaticFileService }
            ]
        },
        component: MusicGalleryComponent
    }
};

export const Default = Template.bind({});
Default.args = {
    title: 'album title',
    genre: 'genre',
    coverImage: 'assets/images/banner-1.jpg',
    songTitle: 'album song',
    songAudio: 'assets/mp3.mp3',
    count: 10
};

    // This is necessary to keep data consistent for testing.
@Injectable({
    providedIn: 'root'
})
class MockMusicService extends MusicService {
    readonly getSongs$ = new Subject<Album>();
    readonly songs$ = this.getSongs$.pipe(
        switchMap(res =>
            this.http.get<any>(
                `${environment.backend}/Albums/${res.id}`
            )
        ),
        map(res => res.songs.map((el: any) => super.createSong(el, res))),
        withLatestFrom(this.getSongs$),
        map(res => res[0].map((el: any, i: number) => ({ ...el, title: res[1].songs[i].title, id: res[1].songs[i].id }))),
        share()
    );

    constructor(http: HttpClient, sanitizer: DomSanitizer, files: StaticFileService) {
        super(http, sanitizer, files);
    }
}
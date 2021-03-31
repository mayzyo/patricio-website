import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata, Story } from '@storybook/angular';
import { merge, Observable, of, Subject } from 'rxjs';
import { MockModelProvider } from 'src/app/core/mock-model.interceptor';
import { StaticFileService } from 'src/app/core/static-file.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { AlbumCoverComponent } from '../album-cover/album-cover.component';
import { Song } from '../models';
import { MusicService } from '../music.service';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { ShowcaseComponent } from './showcase.component';

export default {
    title: 'Home/Showcase',
    decorators: [
        moduleMetadata({
            declarations: [ShowcaseComponent, QuickPlayerComponent, AlbumCoverComponent],
            imports: [SharedModule, BrowserAnimationsModule, SwiperModule, LayoutModule, FontAwesomeModule, RouterTestingModule, HttpClientModule],
            providers: [MockModelProvider]
        }),
    ],
};

// const showcase$ = new Subject<Song[]>();

const Template: Story<Song & { count: number, coverImage: string, audio: string }> = args => {
    // const data = {
    //     ...args,
    //     coverImage$: of(args.coverImage),
    //     audio$: of(args.audio),
    // }

    // showcase$.next(Array.from({ length: args.count }).map(() => data));
    // class MockMusicService implements Partial<MusicService> {
    //     readonly showcase$: Observable<Song[]> = merge(
    //         of(Array.from({ length: args.count }).map(() => data)), 
    //         showcase$
    //     );
    // }
    class MockStaticFileService implements Partial<StaticFileService> {
        get(fileName: string) {
            return of('assets/images/banner-1.jpg');
        }
    }

    return {
        // moduleMetadata: {
        //     providers: [{ provide: MusicService, useClass: MockMusicService }]
        // },
        moduleMetadata: {
            providers: [{ provide: StaticFileService, useClass: MockStaticFileService }]
        },
        component: ShowcaseComponent,
        props: {
            animate$: of(null)
        }
    }
};

export const Default = Template.bind({});
Default.args = {
    title: 'All Of Me', 
    genre: 'Pop',
    coverImage: 'assets/images/banner-1.jpg',
    audio: 'assets/mp3.mp3',
    count: 10
};
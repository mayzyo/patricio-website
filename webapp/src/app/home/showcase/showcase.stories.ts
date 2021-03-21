import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata, Story } from '@storybook/angular';
import { merge, Observable, of, Subject } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { Song } from '../models';
import { MusicService } from '../music.service';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { ShowcaseComponent } from './showcase.component';

export default {
    title: 'Home/Showcase',
    decorators: [
        moduleMetadata({
            declarations: [ShowcaseComponent, QuickPlayerComponent],
            imports: [SharedModule, BrowserAnimationsModule, SwiperModule, LayoutModule, FontAwesomeModule, RouterModule]
        }),
    ],
};

const showcase$ = new Subject<Song[]>();

const Template: Story<Song & { count: number }> = args => {
    showcase$.next(Array.from({ length: args.count }).map(() => args));
    class MockMusicService implements Partial<MusicService> {
        readonly showcase$: Observable<Song[]> = merge(
            of(Array.from({ length: args.count }).map(() => args)), 
            showcase$
        );
    }

    return {
        moduleMetadata: {
            providers: [{ provide: MusicService, useClass: MockMusicService }]
        },
        component: ShowcaseComponent
    }
};

export const Default = Template.bind({});
Default.args = {
    title: 'All Of Me', 
    genre: 'Pop',
    coverImage$: of('assets/images/banner-1.jpg'), 
    album: { title: 'Legends', genre: 'Pop', songs: [] },
    count: 10
};
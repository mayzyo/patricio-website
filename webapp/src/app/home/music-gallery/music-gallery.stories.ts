import { moduleMetadata, Story } from '@storybook/angular';
import { MusicGalleryComponent } from './music-gallery.component';
import { SwiperModule } from 'swiper/angular';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { MusicService } from '../music.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Album } from '../models';
import { switchMap } from 'rxjs/operators';
import { MusicGallerySongsComponent } from '../music-gallery-songs/music-gallery-songs.component';
import { AlbumComponent } from '../album/album.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

export default {
    title: 'Home/Music Gallery',
    decorators: [
        moduleMetadata({
            declarations: [MusicGalleryComponent, MusicGallerySongsComponent, AlbumComponent, QuickPlayerComponent],
            imports: [SwiperModule, FontAwesomeModule, RouterModule]
        }),
    ]
};

const Template: Story<any> = args => {
    class MockMusicService implements Partial<MusicService> {
        readonly albums$: Observable<Album[]> = of([]);
        readonly getSongs$ = new ReplaySubject<Album>();
        readonly songs$ = this.getSongs$.pipe(
            switchMap(res =>
                of([])
            )
        );
    }

    return {
        moduleMetadata: {
            providers: [{ provide: MusicService, useClass: MockMusicService }]
        },
        component: MusicGalleryComponent
    }
};

export const Default = Template.bind({});
Default.args = {

};
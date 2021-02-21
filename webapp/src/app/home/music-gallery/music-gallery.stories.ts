import { moduleMetadata } from '@storybook/angular';
import { MusicGalleryComponent } from './music-gallery.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';

export default {
    title: 'Home/Music Gallery',
    decorators: [
        moduleMetadata({
            declarations: [MusicGalleryComponent, QuickPlayerComponent],
            imports: [HttpClientModule, SwiperModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: MusicGalleryComponent,
});
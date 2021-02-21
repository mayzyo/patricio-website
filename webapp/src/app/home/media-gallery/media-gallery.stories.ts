import { moduleMetadata } from '@storybook/angular';
import { MediaGalleryComponent } from './media-gallery.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { GroupPipe } from 'src/app/shared/group.pipe';

export default {
    title: 'Home/Media Gallery',
    decorators: [
        moduleMetadata({
            declarations: [MediaGalleryComponent, GroupPipe],
            imports: [HttpClientModule, SwiperModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: MediaGalleryComponent,
});
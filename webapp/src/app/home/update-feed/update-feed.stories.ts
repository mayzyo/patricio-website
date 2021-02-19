import { moduleMetadata } from '@storybook/angular';
import { UpdateFeedComponent } from './update-feed.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { UpdatePostComponent } from '../update-post/update-post.component';
import { LimitPipe } from 'src/app/shared/limit.pipe';

export default {
    title: 'Updates/Update Feed',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [UpdateFeedComponent, UpdatePostComponent, LimitPipe],
            imports: [HttpClientModule, SwiperModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: UpdateFeedComponent,
});
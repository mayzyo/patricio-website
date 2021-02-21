import { moduleMetadata } from '@storybook/angular';
import { FeedComponent } from './feed.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { PostCardComponent } from '../post-card/post-card.component';
import { LimitPipe } from 'src/app/shared/limit.pipe';

export default {
    title: 'Home/Feed',
    decorators: [
        moduleMetadata({
            declarations: [FeedComponent, PostCardComponent, LimitPipe],
            imports: [HttpClientModule, SwiperModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: FeedComponent,
});
import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { LimitPipe } from 'src/app/shared/limit.pipe';
import { SwiperModule } from 'swiper/angular';
import { HighlightReelComponent } from '../highlight-reel/highlight-reel.component';
import { QuickFeedComponent } from '../quick-feed/quick-feed.component';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { ShowcaseComponent } from './showcase.component';

export default {
    title: 'Home/Showcase',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [ShowcaseComponent, HighlightReelComponent, QuickFeedComponent, QuickPlayerComponent, LimitPipe],
            imports: [SwiperModule, HttpClientModule],
            providers: [MockDataProvider]
        }),
    ],
};

export const Default = () => ({
    component: ShowcaseComponent,
});
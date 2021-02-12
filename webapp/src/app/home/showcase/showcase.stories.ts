import { moduleMetadata } from '@storybook/angular';
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
            declarations: [ShowcaseComponent, HighlightReelComponent, QuickFeedComponent, QuickPlayerComponent],
            imports: [SwiperModule]
        }),
    ],
};

export const Default = () => ({
    component: ShowcaseComponent,
});
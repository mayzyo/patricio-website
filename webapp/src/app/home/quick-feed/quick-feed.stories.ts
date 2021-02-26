import { moduleMetadata } from '@storybook/angular';
import { QuickFeedComponent } from './quick-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { LimitPipe } from 'src/app/shared/limit.pipe';
import { PostCardComponent } from '../post-card/post-card.component';

export default {
    title: 'Home/Quick Feed',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [QuickFeedComponent, PostCardComponent, LimitPipe],
            imports: [HttpClientModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: QuickFeedComponent,
});
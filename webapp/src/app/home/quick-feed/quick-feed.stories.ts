import { moduleMetadata } from '@storybook/angular';
import { QuickFeedComponent } from './quick-feed.component';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { LimitPipe } from 'src/app/shared/limit.pipe';

export default {
    title: 'Home/Quick Feed',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [QuickFeedComponent, QuickPlayerComponent, LimitPipe],
            imports: [HttpClientModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: QuickFeedComponent,
});
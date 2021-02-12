import { moduleMetadata } from '@storybook/angular';
import { QuickFeedComponent } from './quick-feed.component';
import { from } from 'rxjs';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';

export default {
    title: 'Home/Highlight Reel',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [QuickFeedComponent, QuickPlayerComponent],
            imports: [HttpClientModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: QuickFeedComponent,
    props: {
        datasource$: from([
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', subtitle: 'Subtitle', backgroundUrl: 'assets/images/banner-1.jpg' }
        ])
    }
});
import { moduleMetadata } from '@storybook/angular';
import { HighlightReelComponent } from './highlight-reel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { HttpClientModule } from '@angular/common/http';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { LayoutModule } from '@angular/cdk/layout';

export default {
    title: 'Home/Highlight Reel',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [HighlightReelComponent, QuickPlayerComponent],
            imports: [BrowserAnimationsModule, HttpClientModule, SwiperModule, LayoutModule],
            providers: [MockDataProvider]
        }),
    ]
};

export const Default = () => ({
    component: HighlightReelComponent,
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
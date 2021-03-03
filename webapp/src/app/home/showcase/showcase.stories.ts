import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { SwiperModule } from 'swiper/angular';
import { QuickPlayerComponent } from '../quick-player/quick-player.component';
import { ShowcaseComponent } from './showcase.component';

export default {
    title: 'Home/Showcase',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [ShowcaseComponent, QuickPlayerComponent],
            imports: [BrowserAnimationsModule, HttpClientModule, SwiperModule, LayoutModule],
            providers: [MockDataProvider]
        }),
    ],
};

export const Default = () => ({
    component: ShowcaseComponent,
});
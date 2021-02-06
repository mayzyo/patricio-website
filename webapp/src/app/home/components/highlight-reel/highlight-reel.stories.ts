import { moduleMetadata } from '@storybook/angular';
import { HighlightReelComponent } from './highlight-reel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { TouchableAComponent } from '../touchable-a/touchable-a.component';
import { TouchableBComponent } from '../touchable-b/touchable-b.component';
import { TouchableCComponent } from '../touchable-c/touchable-c.component';
import { TouchableDComponent } from '../touchable-d/touchable-d.component';

export default {
    title: 'Layout/Layout - A',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [HighlightReelComponent, TouchableAComponent, TouchableBComponent, TouchableCComponent, TouchableDComponent],
            imports: [BrowserAnimationsModule, SwiperModule],
        }),
    ]
};

export const Default = () => ({
    component: HighlightReelComponent,
    props: {
        datasource$: from([
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
            { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' }
        ])
    }
});
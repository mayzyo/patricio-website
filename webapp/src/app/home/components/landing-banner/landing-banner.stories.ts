import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingBannerComponent } from './landing-banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
    title: 'Home/Landing Banner',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [LandingBannerComponent],
            imports: [BrowserAnimationsModule, FontAwesomeModule],
        }),
    ],
};

export const Default = () => ({
    component: LandingBannerComponent,
});
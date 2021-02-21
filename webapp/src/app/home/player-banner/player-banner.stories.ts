import { moduleMetadata } from '@storybook/angular';
import { PlayerBannerComponent } from './player-banner.component';

export default {
    title: 'Home/Player Banner',
    decorators: [
        moduleMetadata({
            declarations: [PlayerBannerComponent],
        }),
    ],
};

export const Default = () => ({
    component: PlayerBannerComponent,
});
import { moduleMetadata } from '@storybook/angular';
import { ShowcaseComponent } from './showcase.component';

export default {
    title: 'Home/Showcase',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [ShowcaseComponent]
        }),
    ],
};

export const Default = () => ({
    component: ShowcaseComponent,
});
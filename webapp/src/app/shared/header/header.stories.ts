import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header.component';
import { ScrollableLabelsComponent } from '../scrollable-labels/scrollable-labels.component';

export default {
    title: 'Shared/Header',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [HeaderComponent, ScrollableLabelsComponent],
            imports: [FontAwesomeModule],
        }),
    ],
};

export const Default = () => ({
    component: HeaderComponent,
});

export const MenuClosed = () => ({
    component: HeaderComponent,
    props: {
        isActive: false
    },
});
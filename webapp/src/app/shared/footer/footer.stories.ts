import { moduleMetadata } from '@storybook/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer.component';

export default {
    title: 'Shared/Footer',
    decorators: [
        moduleMetadata({
            declarations: [FooterComponent],
            imports: [FontAwesomeModule],
        }),
    ],
};

export const Default = () => ({
    component: FooterComponent,
});
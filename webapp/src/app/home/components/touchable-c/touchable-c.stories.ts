import { moduleMetadata } from '@storybook/angular';
import { TouchableCComponent } from './touchable-c.component';

export default {
    title: 'Touchable/Touchable - C',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [TouchableCComponent],
        }),
    ],
};

const Template = (args: TouchableCComponent) => ({
    component: TouchableCComponent,
    props: args
});

export const Default: any = Template.bind({});

Default.args = {
    title: 'Touchable Title',
    subtitle: 'Touchable Subtitle',
    backgroundUrl: 'assets/images/banner-1.jpg'
};
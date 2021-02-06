import { moduleMetadata } from '@storybook/angular';
import { TouchableDComponent } from './touchable-d.component';

export default {
    title: 'Touchable/Touchable - D',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [TouchableDComponent],
        }),
    ],
};

const Template = (args: TouchableDComponent) => ({
    component: TouchableDComponent,
    props: args
});

export const Default: any = Template.bind({});

Default.args = {
    title: 'Touchable Title',
    subtitle: 'Touchable Subtitle',
    backgroundUrl: 'assets/images/banner-1.jpg'
};
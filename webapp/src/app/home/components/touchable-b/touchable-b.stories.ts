import { moduleMetadata } from '@storybook/angular';
import { TouchableBComponent } from './touchable-b.component';

export default {
    title: 'Touchable/Touchable - B',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [TouchableBComponent],
        }),
    ],
};

const Template = (args: TouchableBComponent) => ({
    component: TouchableBComponent,
    props: args
});

export const Default: any = Template.bind({});

Default.args = {
    title: 'Touchable Title',
    subtitle: 'Touchable Subtitle',
    backgroundUrl: 'assets/images/banner-1.jpg'
};
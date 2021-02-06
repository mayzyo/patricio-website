import { moduleMetadata } from '@storybook/angular';
import { TouchableAComponent } from './touchable-a.component';

export default {
    title: 'Touchable/Touchable - A',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [TouchableAComponent],
        }),
    ],
};

const Template = (args: TouchableAComponent) => ({
    component: TouchableAComponent,
    props: args
});

export const Default: any = Template.bind({});

Default.args = {
    title: 'Touchable Title',
    subtitle: 'Touchable Subtitle',
    backgroundUrl: 'assets/images/banner-1.jpg'
};
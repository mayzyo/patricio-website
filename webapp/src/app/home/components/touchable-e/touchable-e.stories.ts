import { moduleMetadata } from '@storybook/angular';
import { TouchableEComponent } from './touchable-e.component';

export default {
    title: 'Touchable/Touchable - D',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [TouchableEComponent],
        }),
    ],
};

const Template = (args: TouchableEComponent) => ({
    component: TouchableEComponent,
    props: args
});

export const Default: any = Template.bind({});

Default.args = {
    text: 'Button Text'
};
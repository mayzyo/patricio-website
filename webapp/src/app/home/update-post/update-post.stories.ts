import { moduleMetadata, Story } from '@storybook/angular';
import { LimitPipe } from 'src/app/shared/limit.pipe';
import { Post } from '../models';
import { UpdatePostComponent } from './update-post.component';

export default {
    title: 'Updates/Update Post',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [UpdatePostComponent, LimitPipe]
        }),
    ]
};

const Template: Story<Post> = args => ({
    component: UpdatePostComponent,
    props: { datasource: args },
});

export const Default = Template.bind({});
Default.args = {
    heading: 'Christmas Jam at E.T. Brewery',
    body: 'Voluptatum et et optio. Eaque ipsum voluptate ullam. Dolores officia laboriosam accusantium temporibus quis vitae ea. Enim aspernatur tempore ea fugit quis nisi eum alias.',
    created: 'Sun Mar 28 2021 15:53'
};
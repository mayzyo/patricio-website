import { moduleMetadata, Story } from '@storybook/angular';
import { LimitPipe } from 'src/app/shared/limit.pipe';
import { Post } from '../models';
import { PostCardComponent } from './post-card.component';

export default {
    title: 'Home/Post Card',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [PostCardComponent, LimitPipe]
        }),
    ]
};

const Template: Story<Post> = args => ({
    component: PostCardComponent,
    props: { datasource: args },
});

export const Default = Template.bind({});
Default.args = {
    title: 'Christmas Jam at E.T. Brewery',
    content: 'Voluptatum et et optio. Eaque ipsum voluptate ullam. Dolores officia laboriosam accusantium temporibus quis vitae ea. Enim aspernatur tempore ea fugit quis nisi eum alias.',
    created: 'Sun Mar 28 2021 15:53'
};
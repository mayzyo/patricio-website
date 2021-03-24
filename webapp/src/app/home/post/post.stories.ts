import { moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { Post } from '../models';
import { PostComponent } from './post.component';

export default {
    title: 'Home/Post',
    decorators: [
        moduleMetadata({
            declarations: [PostComponent],
            imports: [SharedModule]
        }),
    ]
};

const Template: Story<Post> = args => ({
    component: PostComponent,
    props: { post: args },
});

export const Default = Template.bind({});
Default.args = {
    title: 'Christmas Jam at E.T. Brewery',
    content: 'Voluptatum et et optio. Eaque ipsum voluptate ullam. Dolores officia laboriosam accusantium temporibus quis vitae ea. Enim aspernatur tempore ea fugit quis nisi eum alias.',
    created: 'Sun Mar 28 2021 15:53'
};
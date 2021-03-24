import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AlbumCoverComponent } from './album-cover.component';
import { Album } from '../models';

export default {
    title: 'Home/Album Cover',
    decorators: [
        moduleMetadata({
            declarations: [AlbumCoverComponent]
        }),
        (storyFunc: any) => ({
            ...storyFunc(),
            template: `
                <app-album-cover [class]="isHover ? '__hover' : ''" [coverImage]="coverImage">
                    <p class="content">{{ title }}</p>
                </app-album-cover>
            `,
            styles: [`
                app-album-cover { height: 100vh; }
                .content { pointer-events: none; z-index: 1; }
            `]
        })
    ]
} as Meta;

const Template: Story<Album> = args => {
    return {
        component: AlbumCoverComponent,
        props: args
    }
};

export const Default = Template.bind({});
Default.args = {
    title: 'minus numquam officia',
    coverImage: 'assets/images/banner-1.jpg',
};

export const Hover: Story<Album> = args => ({
    component: AlbumCoverComponent,
    props: {
        ...args,
        isHover: true,
        // selectId: action('selectId')
    }
});
Hover.args = Default.args
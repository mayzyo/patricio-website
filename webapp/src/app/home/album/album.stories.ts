import { moduleMetadata, Story } from '@storybook/angular';
import { AlbumComponent } from './album.component';
import { of } from 'rxjs';
import { Album } from '../models';

export default {
    title: 'Home/Album',
    decorators: [
        moduleMetadata({
            declarations: [AlbumComponent]
        }),
        (storyFunc: any) => {
            const story = storyFunc();
            return {
                ...story,
                template: `
                    <app-album [album]="album" [backgroundUrl]="album.coverImage$ | async" [class]="isHover ? '__hover' : ''">
                        <p style="z-index: 10; pointer-events: none;">{{ album.title }}</p>
                    </app-album>
                `,
            };
        }
    ]
};

const Template: Story<Album> = args => ({
    component: AlbumComponent,
    props: { album: args },
});

export const Default = Template.bind({});
Default.args = {
    title: 'Legend',
    genre: 'Pop',
    coverImage$: of('assets/images/banner-1.jpg')
};

export const Hover: Story<Album> = args => ({
    component: AlbumComponent,
    props: { song: args, isHover: true },
});
Hover.args = Default.args
import { moduleMetadata, Story } from '@storybook/angular';
import { QuickPlayerComponent } from './quick-player.component';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Song } from '../models';

export default {
    title: 'Home/Quick Player',
    decorators: [
        moduleMetadata({
            declarations: [QuickPlayerComponent],
            imports: [FontAwesomeModule, RouterModule]
        }),
        (storyFunc: any) => {
            const story = storyFunc();
            return {
                ...story,
                template: `
                    <app-quick-player [song]="song" [class]="isHover ? '__hover' : ''">
                        <p style="z-index: 10; pointer-events: none;">{{ song.title }}</p>
                    </app-quick-player>
                `,
            };
        }
    ]
};

const Template: Story<Song> = args => ({
    component: QuickPlayerComponent,
    props: { song: args },
});

export const Default = Template.bind({});
Default.args = {
    title: 'All Of Me',
    genre: 'Pop',
    coverImage$: of('assets/images/banner-1.jpg')
};

export const Hover: Story<Song> = args => ({
    component: QuickPlayerComponent,
    props: { song: args, isHover: true },
});
Hover.args = Default.args
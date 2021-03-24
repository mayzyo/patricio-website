import { moduleMetadata, Story } from '@storybook/angular';
import { QuickPlayerComponent } from './quick-player.component';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { Song } from '../models';
import { AlbumCoverComponent } from '../album-cover/album-cover.component';

export default {
    title: 'Home/Quick Player',
    decorators: [
        moduleMetadata({
            declarations: [QuickPlayerComponent, AlbumCoverComponent],
            imports: [FontAwesomeModule, RouterTestingModule]
        }),
        (storyFunc: any) => ({
            ...storyFunc(),
            template: `
                <app-quick-player [song]="song" [isActive]="isActive">
                    <p class="content">{{ song.title }}</p>
                </app-quick-player>
            `,
            styles: [`
                app-quick-player { height: 100vh; }
                .content { pointer-events: none; z-index: 1; }
            `]
        })
    ]
};

const Template: Story<Song & { coverImage: string }> = args => ({
    component: QuickPlayerComponent,
    props: { 
        song: { ...args, coverImage$: of(args.coverImage), audio$: of(args.audio) } 
    },
});

export const Default = Template.bind({});
Default.args = {
    title: 'All Of Me',
    genre: 'Pop',
    audio: 'assets/mp3.mp3',
    soundCloud: 'https://www.soundcloud.com',
    coverImage: 'assets/images/banner-1.jpg'
};

export const Hover: Story<Song & { coverImage: string }> = args => ({
    component: QuickPlayerComponent,
    props: { 
        song: { ...args, coverImage$: of(args.coverImage), audio$: of(args.audio) },
        isActive: true
    },
});
Hover.args = Default.args
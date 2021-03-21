import { ActivatedRoute } from '@angular/router';
import { moduleMetadata, Story } from '@storybook/angular';
import { of } from 'rxjs';
import { MusicService } from '../music.service';
import { FullPlayerComponent } from './full-player.component';

export default {
    title: 'Home/Full Player',
    decorators: [
        moduleMetadata({
            declarations: [FullPlayerComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: (id: string) => 1
                        })
                    },
                },
            ]
        }),
    ],
};

const Template: Story<any> = args => {
    class MockMusicService implements Partial<MusicService> {
        get$(id: string) {
            return of({} as any)
        }
    }

    return {
        moduleMetadata: {
            providers: [{ provide: MusicService, useClass: MockMusicService }]
        },
        component: FullPlayerComponent
    }
};

export const Default = Template.bind({});
Default.args = {
    title: 'All Of Me',
    genre: 'Pop',
    album: { title: 'Legends', genre: 'Pop', songs: [] },
    count: 10
};
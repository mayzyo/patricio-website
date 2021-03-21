import { moduleMetadata, Story } from '@storybook/angular';
import { QuickFeedComponent } from './quick-feed.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { SocialService } from '../social.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable, of } from 'rxjs';
import { QuickEvent } from '../models';

export default {
    title: 'Home/Quick Feed',
    decorators: [
        moduleMetadata({
            declarations: [QuickFeedComponent, PostCardComponent],
            imports: [SharedModule]
        }),
    ]
};

const Template: Story<any> = args => {
    class MockSocialService implements Partial<SocialService> {
        readonly latest$: Observable<QuickEvent[]> = of([]);
    }

    return {
        moduleMetadata: {
            providers: [{ provide: SocialService, useClass: MockSocialService }]
        },
        component: QuickFeedComponent
    }
};

export const Default = Template.bind({});
Default.args = {

};
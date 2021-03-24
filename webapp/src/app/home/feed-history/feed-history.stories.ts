import { moduleMetadata, Story } from '@storybook/angular';
import { of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocialService } from '../social.service';
import { FeedHistoryComponent } from './feed-history.component';

export default {
    title: 'Home/Feed history',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [FeedHistoryComponent],
            imports: [SharedModule]
        }),
    ]
};

const Template: Story<any> = args => {
    class MockSocialService implements Partial<SocialService> {
        readonly getArchivedPosts$ = new Subject<{ year: string | number, month: string | number }>();
        archivedPosts$ = this.getArchivedPosts$.pipe(
          switchMap(res => of([]))
        );
    }

    return {
        moduleMetadata: {
            providers: [{ provide: SocialService, useClass: MockSocialService }]
        },
        component: FeedHistoryComponent
    }
};

export const Default = Template.bind({});
Default.args = {

};
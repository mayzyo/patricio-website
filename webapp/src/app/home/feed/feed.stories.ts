import { moduleMetadata, Story } from '@storybook/angular';
import { FeedComponent } from './feed.component';
import { SwiperModule } from 'swiper/angular';
import { PostCardComponent } from '../post-card/post-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';
import { Filter, SocialService } from '../social.service';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../models';

export default {
    title: 'Home/Feed',
    decorators: [
        moduleMetadata({
            declarations: [FeedComponent, PostCardComponent],
            imports: [SharedModule, SwiperModule, ScrollingModule]
        }),
    ]
};


const Template: Story<any> = args => {
    class MockSocialService implements Partial<SocialService> {
        readonly getArchivedPosts$ = new Subject<{ year: string | number, month: string | number }>();
        private archivedPosts$ = this.getArchivedPosts$.pipe(
          switchMap(res => of([]))
        );
      
        readonly getPosts$ = new BehaviorSubject<Filter>(Filter.ALL);
        private readonly allPosts$ = this.getPosts$.pipe(
          switchMap(res => of([]))
        );
      
        readonly posts$: Observable<Post[]> = merge(
          this.allPosts$,
          this.archivedPosts$
        );
      
        readonly archive$: Observable<Array<{ year: number, months: number[] }>> = of([])
    }

    return {
        moduleMetadata: {
            providers: [{ provide: SocialService, useClass: MockSocialService }]
        },
        component: FeedComponent
    }
};

export const Default = Template.bind({});
Default.args = {
    title: 'All Of Me', 
    genre: 'Pop',
    coverImage$: of('assets/images/banner-1.jpg'), 
    album: { title: 'Legends', genre: 'Pop', songs: [] },
    count: 10
};
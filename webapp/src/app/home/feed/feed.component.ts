import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter, SocialService } from '../social.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  filter: string = 'all';

  constructor(public socials: SocialService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.socials.getArchivedPosts$.subscribe(() => 
        this.filter = ''
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeFilter() {
    switch(this.filter) {
      case 'all':
        this.socials.getPosts$.next(Filter.ALL);
        break;
      case 'events':
        this.socials.getPosts$.next(Filter.EVENTS);
        break;
      case 'updates':
        this.socials.getPosts$.next(Filter.POSTS);
        break;
    };
  }
}

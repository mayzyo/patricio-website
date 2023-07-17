import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { EmailMeComponent } from '../shared/components/email-me/email-me.component';
import { ListingComponent } from '../shared/components/listing/listing.component';



@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule,

    BannerComponent,
    EmailMeComponent,
    ListingComponent
  ]
})
export class FeedModule { }

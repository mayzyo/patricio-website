import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule,

    SharedModule
  ]
})
export class FeedModule { }

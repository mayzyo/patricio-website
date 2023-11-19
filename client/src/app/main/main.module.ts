import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesComponent } from './components/updates/updates.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeedFilterComponent } from './components/feed-filter/feed-filter.component';
import { EmailMeComponent } from '../shared/components/email-me/email-me.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleComponent } from '../shared/components/title/title.component';
import { FeedComponent } from '../shared/components/feed/feed.component';
import { FeedHistoryComponent } from './components/feed-history/feed-history.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SongBacklogComponent } from './components/song-backlog/song-backlog.component';
import { DiscographyComponent } from './components/discography/discography.component';
import { RouterModule } from '@angular/router';
import { MediaComponent } from './components/media/media.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { GalleryModule } from 'ng-gallery';



@NgModule({
  declarations: [
    UpdatesComponent,
    DiscographyComponent,
    MediaComponent,
    BannerComponent,
    FeedFilterComponent,
    FeedHistoryComponent,
    SongBacklogComponent,
    PhotoGalleryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    GalleryModule,
    TitleComponent,
    FeedComponent,
    EmailMeComponent
  ]
})
export class MainModule { }

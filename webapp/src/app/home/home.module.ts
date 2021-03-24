import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { UpdatesComponent } from './updates/updates.component';
import { DiscographyComponent } from './discography/discography.component';
import { MediaComponent } from './media/media.component';
import { LandingBannerComponent } from './landing-banner/landing-banner.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { BiographyComponent } from './biography/biography.component';
import { EmailMeComponent } from './email-me/email-me.component';
import { QuickFeedComponent } from './quick-feed/quick-feed.component';
import { FeedComponent } from './feed/feed.component';
import { MusicGalleryComponent } from './music-gallery/music-gallery.component';
import { MusicComponent } from './music/music.component';
import { LegalComponent } from './legal/legal.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { QuickPlayerComponent } from './quick-player/quick-player.component';
import { FeedHistoryComponent } from './feed-history/feed-history.component';
import { MusicGallerySongsComponent } from './music-gallery-songs/music-gallery-songs.component';
import { FullPlayerComponent } from './full-player/full-player.component';
import { PostComponent } from './post/post.component';
import { AlbumCoverComponent } from './album-cover/album-cover.component';


@NgModule({
  declarations: [HomeComponent, UpdatesComponent, DiscographyComponent, MediaComponent, LandingBannerComponent, ShowcaseComponent, BiographyComponent, EmailMeComponent, QuickFeedComponent, FeedComponent, MusicGalleryComponent, MusicComponent, LegalComponent, ImageViewerComponent, QuickPlayerComponent, FeedHistoryComponent, MusicGallerySongsComponent, FullPlayerComponent, PostComponent, AlbumCoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HomeRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    ScrollingModule
  ]
})
export class HomeModule { }

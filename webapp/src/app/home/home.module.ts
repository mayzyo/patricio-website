import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UpdatesComponent } from './updates/updates.component';
import { DiscographyComponent } from './discography/discography.component';
import { MediaComponent } from './media/media.component';
import { HomeRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { HighlightReelComponent } from './highlight-reel/highlight-reel.component';
import { SharedModule } from '../shared/shared.module';
import { LandingBannerComponent } from './landing-banner/landing-banner.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { BiographyComponent } from './biography/biography.component';
import { EmailMeComponent } from './email-me/email-me.component';
import { QuickFeedComponent } from './quick-feed/quick-feed.component';
import { FeedComponent } from './feed/feed.component';
import { MusicGalleryComponent } from './music-gallery/music-gallery.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MusicComponent } from './music/music.component';
import { LegalComponent } from './legal/legal.component';
import { MusicBannerComponent } from './music-banner/music-banner.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { QuickPlayerComponent } from './quick-player/quick-player.component';
import { PostCardComponent } from './post-card/post-card.component';



@NgModule({
  declarations: [HomeComponent, UpdatesComponent, DiscographyComponent, MediaComponent, HighlightReelComponent, LandingBannerComponent, ShowcaseComponent, HighlightReelComponent, BiographyComponent, EmailMeComponent, QuickFeedComponent, FeedComponent, MusicGalleryComponent, MediaGalleryComponent, MusicComponent, LegalComponent, MusicBannerComponent, ImageViewerComponent, QuickPlayerComponent, PostCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FontAwesomeModule,
    SwiperModule
  ]
})
export class HomeModule { }

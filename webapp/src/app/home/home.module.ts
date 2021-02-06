import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { DiscographyComponent } from './pages/discography/discography.component';
import { MediaComponent } from './pages/media/media.component';
import { HomeRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { HighlightReelComponent } from './components/highlight-reel/highlight-reel.component';
import { SharedModule } from '../shared/shared.module';
import { TouchableAComponent } from './components/touchable-a/touchable-a.component';
import { TouchableBComponent } from './components/touchable-b/touchable-b.component';
import { TouchableCComponent } from './components/touchable-c/touchable-c.component';
import { TouchableDComponent } from './components/touchable-d/touchable-d.component';
import { TouchableEComponent } from './components/touchable-e/touchable-e.component';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { BiographyComponent } from './components/biography/biography.component';
import { EmailMeComponent } from './components/email-me/email-me.component';
import { QuickFeedComponent } from './components/quick-feed/quick-feed.component';
import { UpdateFeedComponent } from './components/update-feed/update-feed.component';
import { MusicGalleryComponent } from './components/music-gallery/music-gallery.component';
import { MediaGalleryComponent } from './components/media-gallery/media-gallery.component';
import { MusicComponent } from './pages/music/music.component';
import { LegalComponent } from './pages/legal/legal.component';
import { MusicBannerComponent } from './components/music-banner/music-banner.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';



@NgModule({
  declarations: [HomeComponent, UpdatesComponent, DiscographyComponent, MediaComponent, HighlightReelComponent, TouchableAComponent, TouchableBComponent, TouchableCComponent, TouchableDComponent, TouchableEComponent, LandingBannerComponent, ShowcaseComponent, HighlightReelComponent, BiographyComponent, EmailMeComponent, QuickFeedComponent, UpdateFeedComponent, MusicGalleryComponent, MediaGalleryComponent, MusicComponent, LegalComponent, MusicBannerComponent, ImageViewerComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FontAwesomeModule,
    SwiperModule
  ]
})
export class HomeModule { }

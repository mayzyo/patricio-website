import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faRecordVinyl, faPortrait, faArrowDown, faBullhorn, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faPlayCircle, faClock } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare, faLinkedin, faInstagram, faWeixin, faWeibo, faSoundcloud } from '@fortawesome/free-brands-svg-icons';

import { authProvider } from './utils/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmailComponent } from './components/email/email.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { MusicsComponent } from './pages/musics/musics.component';
import { MediaComponent } from './pages/media/media.component';
import { ColumnPipe } from './utils/column.pipe';
import { BannerComponent } from './components/banner/banner.component';
import { BannerLandingComponent } from './components/banner-landing/banner-landing.component';
import { ImagePreloadDirective } from './utils/image-preload.directive';
import { ListingComponent } from './components/listing/listing.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { EditorComponent } from './administration/editor/editor.component';
import { SocialMediaComponent } from './administration/social-media/social-media.component';
import { BiographyComponent } from './administration/biography/biography.component';
import { MusicAdminComponent } from './administration/music-admin/music-admin.component';
import { MomentsComponent } from './administration/moments/moments.component';
import { UpdateAdminComponent } from './administration/update-admin/update-admin.component';
import { LegalComponent } from './pages/legal/legal.component';
import { TimeFromNowPipe } from './utils/time-from-now.pipe';
import { MusicDetailComponent } from './pages/music-detail/music-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    EmailComponent,
    UpdatesComponent,
    MusicsComponent,
    MediaComponent,
    ColumnPipe,
    BannerComponent,
    BannerLandingComponent,
    ImagePreloadDirective,
    HighlightComponent,
    ListingComponent,
    EditorComponent,
    SocialMediaComponent,
    BiographyComponent,
    MusicAdminComponent,
    MomentsComponent,
    UpdateAdminComponent,
    LegalComponent,
    TimeFromNowPipe,
    MusicDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [authProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faRecordVinyl, 
      faPortrait,
      faInfoCircle,
      faArrowDown,
      faBullhorn,
      faEdit,
      faPlayCircle,
      faClock,
      faFacebookSquare, 
      faLinkedin, 
      faInstagram, 
      faWeixin, 
      faWeibo, 
      faSoundcloud,
    );
  }
}

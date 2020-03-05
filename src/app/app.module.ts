import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { cacheProvider } from './utils/cache.interceptor';
import { authProvider } from './utils/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmailComponent } from './components/email/email.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { MusicComponent } from './pages/music/music.component';
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
import { SongsComponent } from './administration/songs/songs.component';
import { MomentsComponent } from './administration/moments/moments.component';
import { PostsComponent } from './administration/posts/posts.component';
import { LegalComponent } from './pages/legal/legal.component';
import { TimeFromNowPipe } from './utils/time-from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    EmailComponent,
    UpdatesComponent,
    MusicComponent,
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
    SongsComponent,
    MomentsComponent,
    PostsComponent,
    LegalComponent,
    TimeFromNowPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [authProvider, cacheProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmailComponent } from './components/email/email.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { WorksComponent } from './pages/works/works.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { MediaComponent } from './pages/media/media.component';
import { ColumnPipe } from './utils/column.pipe';
import { BannerComponent } from './components/banner/banner.component';
import { BannerLandingComponent } from './components/banner-landing/banner-landing.component';
import { ImagePreloadDirective } from './utils/image-preload.directive';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    EmailComponent,
    AnnouncementsComponent,
    WorksComponent,
    BlogsComponent,
    MediaComponent,
    ColumnPipe,
    BannerComponent,
    BannerLandingComponent,
    ImagePreloadDirective,
    UpcomingEventsComponent,
    HighlightComponent,
    MusicPlayerComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

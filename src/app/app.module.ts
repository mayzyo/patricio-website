import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { EmailComponent } from './email/email.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { WorksComponent } from './pages/works/works.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { MediaComponent } from './pages/media/media.component';
import { ColumnPipe } from './utils/column.pipe';

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
    ColumnPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

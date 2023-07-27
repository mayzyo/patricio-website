import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './components/home/home.component';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightComponent } from './components/highlight/highlight.component';
import { FeedComponent } from './components/feed/feed.component';
import { DiscographyComponent } from './components/discography/discography.component';
import { MediaComponent } from './components/media/media.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        HomeComponent,
        LandingBannerComponent,
        HighlightComponent,
        FeedComponent,
        DiscographyComponent,
        MediaComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        InfiniteScrollModule,

        SharedModule
    ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpotlightComponent } from './components/spotlight/spotlight.component';
import { BiographyComponent } from './components/biography/biography.component';
import { FeedComponent } from '../shared/components/feed/feed.component';
import { TitleComponent } from '../shared/components/title/title.component';
import { UpcomingEventComponent } from './components/upcoming-event/upcoming-event.component';
import { EmailMeComponent } from '../shared/components/email-me/email-me.component';



@NgModule({
    declarations: [
        HomeComponent,
        LandingBannerComponent,
        SpotlightComponent,
        BiographyComponent,
        UpcomingEventComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TitleComponent,
        FeedComponent,
        EmailMeComponent
    ]
})
export class HomeModule { }
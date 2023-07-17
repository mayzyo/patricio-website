import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightComponent } from './components/highlight/highlight.component';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { EmailMeComponent } from '../shared/components/email-me/email-me.component';
import { ListingComponent } from '../shared/components/listing/listing.component';



@NgModule({
  declarations: [
    HomeComponent,
    LandingBannerComponent,
    HighlightComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,

    BannerComponent,
    EmailMeComponent,
    ListingComponent
  ]
})
export class HomeModule { }

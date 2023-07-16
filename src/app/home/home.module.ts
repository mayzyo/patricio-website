import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightComponent } from './components/highlight/highlight.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    LandingBannerComponent,
    HighlightComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,

    SharedModule
  ]
})
export class HomeModule { }

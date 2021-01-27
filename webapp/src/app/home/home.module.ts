import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { DiscographyComponent } from './pages/discography/discography.component';
import { MediaComponent } from './pages/media/media.component';
import { HomeRoutingModule } from './home-routing.module';
import { BannerAComponent } from './components/banner-a/banner-a.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutAComponent } from './components/layout-a/layout-a.component';



@NgModule({
  declarations: [HomeComponent, UpdatesComponent, DiscographyComponent, MediaComponent, BannerAComponent, LayoutAComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }

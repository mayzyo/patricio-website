import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { DiscographyComponent } from './pages/discography/discography.component';
import { MediaComponent } from './pages/media/media.component';
import { HomeRoutingModule } from './home-routing.module';
import { TopBannerComponent } from './components/top-banner/top-banner.component';



@NgModule({
  declarations: [HomeComponent, UpdatesComponent, DiscographyComponent, MediaComponent, TopBannerComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

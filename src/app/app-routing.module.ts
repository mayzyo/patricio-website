import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { MusicComponent } from './pages/music/music.component';
import { MediaComponent } from './pages/media/media.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'announcements', component: AnnouncementComponent },
  { path: 'works', component: MusicComponent },
  { path: 'media', component: MediaComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { MusicComponent } from './pages/music/music.component';
import { MediaComponent } from './pages/media/media.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'updates', component: UpdatesComponent },
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

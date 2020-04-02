import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { MusicsComponent } from './pages/musics/musics.component';
import { MediaComponent } from './pages/media/media.component';
import { LegalComponent } from './pages/legal/legal.component';
import { MusicDetailComponent } from './pages/music-detail/music-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'discography', component: MusicsComponent },
  { path: 'discography/:id', component: MusicDetailComponent },
  { path: 'media', component: MediaComponent },
  { path: 'privacy-policy', component: LegalComponent },
  { path: 'terms-and-conditions', component: LegalComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

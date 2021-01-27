import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscographyComponent } from './pages/discography/discography.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaComponent } from './pages/media/media.component';
import { UpdatesComponent } from './pages/updates/updates.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'discography', component: DiscographyComponent },
  { path: 'media', component: MediaComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
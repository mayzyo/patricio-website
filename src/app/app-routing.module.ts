import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { WorksComponent } from './pages/works/works.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { MediaComponent } from './pages/media/media.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'works', component: WorksComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/:title', component: BlogsComponent },
  { path: 'media', component: MediaComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

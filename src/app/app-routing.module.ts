import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { FeedComponent } from './feed/components/feed/feed.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'updates',
    component: FeedComponent,
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

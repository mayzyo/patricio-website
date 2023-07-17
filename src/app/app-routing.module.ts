import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { FeedComponent } from './feed/components/feed/feed.component';
import { DiscographyComponent } from './discography/components/discography/discography.component';

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
    {
        path: 'discography',
        component: DiscographyComponent,
        loadChildren: () => import('./discography/discography.module').then(m => m.DiscographyModule)
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './main/components/feed/feed.component';
import { DiscographyComponent } from './main/components/discography/discography.component';
import { MediaComponent } from './main/components/media/media.component';
import { HomeComponent } from './main/components/home/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'updates',
        component: FeedComponent,
    },
    {
        path: 'discography',
        component: DiscographyComponent,
    },
    {
        path: 'media',
        component: MediaComponent,
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

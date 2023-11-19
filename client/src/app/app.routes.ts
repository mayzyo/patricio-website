import { Routes } from '@angular/router';
import { UpdatesComponent } from './main/components/updates/updates.component';
import { HomeComponent } from './home/components/home/home.component';
import { DiscographyComponent } from './main/components/discography/discography.component';
import { MediaComponent } from './main/components/media/media.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'updates',
        component: UpdatesComponent,
    },
    {
        path: 'discography',
        component: DiscographyComponent,
    },
    {
        path: 'media',
        component: MediaComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

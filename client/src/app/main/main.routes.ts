import { Routes } from '@angular/router';
import { UpdatesComponent } from './components/updates/updates.component';
import { DiscographyComponent } from './components/discography/discography.component';
import { MediaComponent } from './components/media/media.component';
import { BlogComponent } from './components/blog/blog.component';

export const routes: Routes = [
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
        path: 'blog/:id',
        component: BlogComponent,
    }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './main/components/feed/feed.component';
import { DiscographyComponent } from './main/components/discography/discography.component';
import { MediaComponent } from './main/components/media/media.component';
import { HomeComponent } from './main/components/home/home.component';
import { PrivacyPolicyComponent } from './legal/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './legal/components/terms-of-service/terms-of-service.component';

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
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
    },
    {
        path: 'terms-of-service',
        component: TermsOfServiceComponent,
        loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

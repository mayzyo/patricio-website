import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },
    {
        path: 'privacy-policy',
        loadComponent: () => import('./misc/components/privacy-policy/privacy-policy.component').then(m =>
            m.PrivacyPolicyComponent
        )
    },
    {
        path: 'terms-of-service',
        loadComponent: () => import('./misc/components/terms-of-service/terms-of-service.component').then(m =>
            m.TermsOfServiceComponent
        )
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

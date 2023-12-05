import { ApplicationConfig, InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

export const STORAGE_URL = new InjectionToken<string>('https://url-to-blob-storage/');
export const API_URL = new InjectionToken<string>('https://url-to-api/');

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({ scrollPositionRestoration: 'top' , anchorScrolling: 'enabled' })
        ),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp({
                "projectId": "patricio-website",
                "appId": "1:887700433909:web:fb4b50a3d13d8fe6b94ebc",
                "storageBucket": "patricio-website.appspot.com",
                "apiKey": "AIzaSyD9huIQLwl_SMUkp6BVNht5TVJfQXOHuZI",
                "authDomain": "patricio-website.firebaseapp.com",
                "messagingSenderId": "887700433909",
                "measurementId": "G-3JJVTG62Z5"
        }))),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        importProvidersFrom(provideAppCheck(() => initializeAppCheck(getApp(), {
            provider: new ReCaptchaV3Provider('6LeRpSMpAAAAAAR1S4Lb5ehO1igl1XHdASZJH51y'),
        }))),
        { provide: STORAGE_URL, useValue: 'https://patriciowebsite.blob.core.windows.net/dev/' },
        { provide: API_URL, useValue: 'https://patricio-website-admin-dev.azurewebsites.net/api/' }
        ]
};

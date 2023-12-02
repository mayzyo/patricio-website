import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
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
            })))
        ]
};

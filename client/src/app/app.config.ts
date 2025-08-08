import { ApplicationConfig, InjectionToken, importProvidersFrom, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { setLogLevel, LogLevel } from "@angular/fire";

setLogLevel(LogLevel.SILENT);

(<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = isDevMode();
export const STORAGE_URL = new InjectionToken<string>('https://url-to-blob-storage/');
export const API_URL = new InjectionToken<string>('https://url-to-api/');

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({ scrollPositionRestoration: 'top' , anchorScrolling: 'enabled' })
        ),
        importProvidersFrom(BrowserAnimationsModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp({
            "projectId": "patricio-website",
            "appId": "1:887700433909:web:fb4b50a3d13d8fe6b94ebc",
            "storageBucket": "patricio-website.appspot.com",
            "apiKey": "AIzaSyD9huIQLwl_SMUkp6BVNht5TVJfQXOHuZI",
            "authDomain": "patricio-website.firebaseapp.com",
            "messagingSenderId": "887700433909",
            "measurementId": "G-3JJVTG62Z5"
        })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideAppCheck(() => initializeAppCheck(getApp(), {
            provider: new ReCaptchaV3Provider('6LeRpSMpAAAAAAR1S4Lb5ehO1igl1XHdASZJH51y'),
        })),
        { provide: STORAGE_URL, useValue: 'https://patriciowebsitev2.blob.core.windows.net/production/' },
        { provide: API_URL, useValue: 'https://patricio-website-admin.azurewebsites.net/api/' }
    ]
};

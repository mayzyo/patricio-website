import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
declare const require;

if (environment.production) {
  enableProdMode();
}

function i18nProvider() {
  if (localStorage.getItem('locale') === null) {
    localStorage.setItem('locale', 'en');
  }
  
  const locale = localStorage.getItem('locale');  
  if(locale != 'en') {
    document.documentElement.setAttribute('lang', locale);
    const translations = require(
      `raw-loader!./locale/messages.${locale}.xlf`
    );
  
    return [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
    ];
  }

  return [];
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: i18nProvider() // internationalisation
}).catch(err => console.error(err));

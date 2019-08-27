import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private current: Locale;

  get locale() {
    return this.current == Locale.EN ? '0' : '1';
  }

  get localeParam() {
    return { params: { lang: this.current == Locale.EN ? '0' : '1' } }
  }

  constructor() {
    this.current = localStorage.getItem('locale') as Locale;
  }

  change(locale: Locale) {
    localStorage.setItem('locale', locale);
    location.reload();
  }
}

export enum Locale {
  EN = 'en',
  ZH = 'zh'
}

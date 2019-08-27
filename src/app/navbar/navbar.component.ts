import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LanguageService, Locale } from '../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  currentUrl: string;
  
  constructor(private languages: LanguageService, private location: Location) {
    this.location.onUrlChange(res => {
      this.currentUrl = res;
      this.isCollapsed = true;
    });

  }

  ngOnInit() {
  }

  setChinese() {
    if(this.languages.locale == '1') return;
    this.languages.change(Locale.ZH);
  }

  setEnglish() {
    if(this.languages.locale == '0') return;
    this.languages.change(Locale.EN);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollableLabelsComponent } from './scrollable-labels/scrollable-labels.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ScrollableLabelsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ScrollingModule,
    // AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }

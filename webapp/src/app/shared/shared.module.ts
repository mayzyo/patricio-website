import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollableLabelsComponent } from './scrollable-labels/scrollable-labels.component';
import { LimitPipe } from './limit.pipe';
import { GroupPipe } from './group.pipe';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ScrollableLabelsComponent, LimitPipe, GroupPipe],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ScrollingModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LimitPipe,
    GroupPipe
  ]
})
export class SharedModule { }

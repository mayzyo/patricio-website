import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SwiperModule } from 'swiper/angular';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollableLabelsComponent } from './scrollable-labels/scrollable-labels.component';
import { LimitPipe } from './limit.pipe';
import { GroupPipe } from './group.pipe';
import { NoticeComponent } from './notice/notice.component';
import { TimeFromNowPipe } from './time-from-now.pipe';
import { ScrollWheelPickerComponent } from './scroll-wheel-picker/scroll-wheel-picker.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ScrollableLabelsComponent, LimitPipe, GroupPipe, NoticeComponent, TimeFromNowPipe, ScrollWheelPickerComponent],
  imports: [
    CommonModule,
    SwiperModule,
    FontAwesomeModule,
    ScrollingModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LimitPipe,
    GroupPipe,
    TimeFromNowPipe
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFromNowPipe } from './pipes/time-from-now.pipe';



@NgModule({
  declarations: [
    TimeFromNowPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeFromNowPipe
  ]
})
export class SharedModule { }

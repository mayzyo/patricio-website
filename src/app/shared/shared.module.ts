import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFromNowPipe } from './pipes/time-from-now.pipe';
import { EmailMeComponent } from './components/email-me/email-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    TimeFromNowPipe,
    EmailMeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  exports: [
    TimeFromNowPipe,
    EmailMeComponent
  ]
})
export class SharedModule { }

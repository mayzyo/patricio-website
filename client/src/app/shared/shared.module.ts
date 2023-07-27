import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './components/banner/banner.component';
import { EmailMeComponent } from './components/email-me/email-me.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListingComponent } from './components/listing/listing.component';
import { TimeFromNowPipe } from './pipes/time-from-now.pipe';



@NgModule({
  declarations: [
    BannerComponent,
    EmailMeComponent,
    ListingComponent,
    TimeFromNowPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    FontAwesomeModule,
  ],
  exports: [
    BannerComponent,
    EmailMeComponent,
    ListingComponent,
    TimeFromNowPipe
  ]
})
export class SharedModule { }

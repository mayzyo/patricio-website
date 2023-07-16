import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFromNowPipe } from './pipes/time-from-now.pipe';
import { EmailMeComponent } from './components/email-me/email-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ListingComponent } from './components/listing/listing.component';
import { BannerComponent } from './components/banner/banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    TimeFromNowPipe,
    EmailMeComponent,
    ListingComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    FontAwesomeModule
  ],
  exports: [
    TimeFromNowPipe,
    EmailMeComponent,
    ListingComponent,
    BannerComponent
  ]
})
export class SharedModule { }

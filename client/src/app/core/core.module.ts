import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbOffcanvasModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaComponent } from './components/social-media/social-media.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SocialMediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbCollapseModule,
    NgbOffcanvasModule,
    NgbPopoverModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }

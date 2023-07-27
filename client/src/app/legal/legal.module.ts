import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';



@NgModule({
  declarations: [
    TermsOfServiceComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LegalModule { }

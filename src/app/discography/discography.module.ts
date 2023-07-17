import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscographyComponent } from './components/discography/discography.component';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { EmailMeComponent } from '../shared/components/email-me/email-me.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        DiscographyComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,

        BannerComponent,
        EmailMeComponent,
    ]
})
export class DiscographyModule { }

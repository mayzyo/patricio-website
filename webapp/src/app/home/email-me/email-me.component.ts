import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/shared/email.service';
import metaData from 'src/meta-data';

@Component({
  selector: 'app-email-me',
  templateUrl: './email-me.component.html',
  styleUrls: ['./email-me.component.scss']
})
export class EmailMeComponent implements OnInit {
  readonly title: string = metaData.emailTitleDesc;
  readonly template: string = metaData.emailTemplateDesc;
  readonly titleOptions: string[] = metaData.emailTitleOptions;
  readonly templateOptions: string[] =metaData.emailTemplateOptions;

  constructor(public emails: EmailService) { }

  ngOnInit(): void {
  }

}

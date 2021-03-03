import { Component, OnInit } from '@angular/core';
import metaData from 'src/meta-data';

@Component({
  selector: 'app-email-me',
  templateUrl: './email-me.component.html',
  styleUrls: ['./email-me.component.scss']
})
export class EmailMeComponent implements OnInit {
  readonly emailTitle: string = metaData.emailTitleDesc;
  readonly emailTemplate: string = metaData.emailTemplateDesc;

  constructor() { }

  ngOnInit(): void {
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from '../home/models';
import { paths } from './backend.api';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  readonly model: Email = {
    address: "",
    message: "",
    title: "",
    template: ""
  };
  submitted = false;

  constructor(private http: HttpClient, private popups: PopupService) { }

  submit() {
    if(!this.submitted) {
      this.submitted = true;

      this.http.post<paths["/Emails"]["post"]["responses"][200]["text/plain"]>(
        `${environment.backend}/Emails`,
        {
          ...this.model,
          isSuccessful: false,
          user: { ipAddress: '' }
        }
      ).subscribe(
        () => {
          this.popups.createNotice('Email sent successfuly!');
          this.reset();
        },
        () => { this.popups.createNotice('Error sending the email, please try again later...') },
        () => this.submitted = false
      )
    }
  }

  reset() {
    this.model.address = '';
    this.model.message = '';
    this.model.title = '';
    this.model.template = '';
  }
}

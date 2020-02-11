import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email, Purpose, Sender } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public sendEmail(email: Email) {

    email.purpose || (email.purpose = Purpose.OTHER);
    email.senderType || (email.senderType = Sender.OTHER);

    const fd = new FormData();
    Object.keys(email).forEach(key => fd.append(key, email[key]));
    return this.http.post('/api/contact/send', fd, { responseType: 'text' });
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email, Purpose, Sender } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  public sendEmail(email: Email) {
    email.purpose || (email.purpose = Purpose.OTHER);
    email.senderType || (email.senderType = Sender.OTHER);

    const fd = new FormData();
    Object.keys(email).forEach(key => fd.append(key, email[key]));
    return this.http.post(`${this.baseUrl}contact/send`, fd, { responseType: 'text' });
  }
}

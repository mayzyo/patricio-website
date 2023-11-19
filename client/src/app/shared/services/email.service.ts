import { Injectable } from '@angular/core';
import { Email, Purpose, Sender } from '../../models/email';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    sendEmail(email: Email): Observable<any> {
        email.purpose || (email.purpose = Purpose.OTHER);
        email.senderType || (email.senderType = Sender.OTHER);

        const fd = new FormData();
        fd.append('message', email.message);
        fd.append('sender', email.sender);
        fd.append('purpose', email.purpose.toString());
        fd.append('senderType', email.senderType.toString());
        throw new Error('Not implemented');
    }
}

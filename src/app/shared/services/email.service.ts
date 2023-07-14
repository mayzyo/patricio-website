import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Email, Purpose, Sender } from 'src/app/models/email';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    sendEmail(email: Email) {
        email.purpose || (email.purpose = Purpose.OTHER);
        email.senderType || (email.senderType = Sender.OTHER);

        const fd = new FormData();
        fd.append('message', email.message);
        fd.append('sender', email.sender);
        fd.append('purpose', email.purpose.toString());
        fd.append('senderType', email.senderType.toString());
        return of();
    }
}

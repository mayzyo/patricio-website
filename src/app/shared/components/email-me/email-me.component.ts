import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { Email, Purpose, Sender } from 'src/app/models/email';

@Component({
    selector: 'app-email-me',
    templateUrl: './email-me.component.html',
    styleUrls: ['./email-me.component.scss'],
})
export class EmailMeComponent {
    updateSuccess$ = new BehaviorSubject<string | null>(null);
    success$ = this.updateSuccess$.pipe(
        debounceTime(2000)
    )

    attemptedSubmit = false;
    submitting = false;

    contactDetail = this.fb.group({
        message: ['', Validators.required],
        sender: ['', Validators.required],
        senderType: [null],
        purpose: [null],
    });

    constructor(private fb: FormBuilder, private emails: EmailService) { }

    onSubmit() {
        this.attemptedSubmit = true;

        if (this.contactDetail.valid && !this.submitting) {
            this.updateSuccess$.next(`message sending...`);

            this.submitting = true;
            const email: Email = {
                message: this.contactDetail.get('message')?.value ?? '',
                sender: this.contactDetail.get('sender')?.value ?? '',
                senderType: this.contactDetail.get('senderType')?.value ?? Sender.OTHER,
                purpose: this.contactDetail.get('purpose')?.value ?? Purpose.OTHER
            }

            this.emails.sendEmail(email).subscribe(() => {
                this.updateSuccess$.next(`thanks for your enquiry!`);
                this.contactDetail.reset();
                this.submitting = false;
                this.attemptedSubmit = false;
            });
        }
    }
}

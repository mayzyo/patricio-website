import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailService } from '../../services/email.service';
import { Email, Purpose, Sender } from '../../../models/email';

@Component({
    selector: 'app-email-me',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
    templateUrl: './email-me.component.html',
    styleUrl: './email-me.component.scss'
})
export class EmailMeComponent {
    private readonly updateSuccess$ = new BehaviorSubject<string | null>(null);
    protected readonly success$ = this.updateSuccess$.pipe(debounceTime(2000));

    attemptedSubmit = signal(false);
    submitting = signal(false);

    contactDetail = this.fb.group({
        message: ['', Validators.required],
        sender: ['', Validators.required],
        senderType: [null],
        purpose: [null],
    });

    constructor(private fb: FormBuilder, private email: EmailService) { }

    onClose(): void {
        this.updateSuccess$.next(null);
    }

    onSubmit() {
        this.attemptedSubmit.set(true);

        if (this.contactDetail.valid && !this.submitting()) {
            this.updateSuccess$.next(`message sending...`);

            this.submitting.set(true);
            const email: Email = {
                message: this.contactDetail.get('message')?.value ?? '',
                sender: this.contactDetail.get('sender')?.value ?? '',
                senderType: this.contactDetail.get('senderType')?.value ?? Sender.OTHER,
                purpose: this.contactDetail.get('purpose')?.value ?? Purpose.OTHER
            }

            this.email.sendEmail(email).subscribe(() => {
                this.updateSuccess$.next(`thanks for your enquiry!`);
                this.contactDetail.reset();
                this.submitting.set(false);
                this.attemptedSubmit.set(false);
            });
        }
    }
}

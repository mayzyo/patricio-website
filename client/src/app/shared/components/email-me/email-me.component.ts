import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailService } from '../../services/email.service';
import { Email } from '../../../models/email';
import { TitleComponent } from '../title/title.component';
import { EditorService } from '../../../admin/services/editor.service';
import { ProfileService } from '../../../core/services/profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-email-me',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbAlertModule,
        FontAwesomeModule,
        TitleComponent
    ],
    templateUrl: './email-me.component.html',
    styleUrl: './email-me.component.scss'
})
export class EmailMeComponent {
    protected readonly success$ = new BehaviorSubject<string | null>(null);
    protected readonly failed$ = new BehaviorSubject<string | null>(null);
    protected readonly purposeOptions$ = this.profile.emailConfig$.pipe(map(({ purpose }) => purpose));
    protected readonly senderTypeOptions$ = this.profile.emailConfig$.pipe(map(({ senderType }) => senderType));

    form = this.fb.group({
        message: ['', Validators.required],
        sender: ['', Validators.required],
        senderType: ['', Validators.required],
        purpose: ['', Validators.required],
    });

    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);

    constructor(
        private fb: FormBuilder,
        private profile: ProfileService,
        private email: EmailService,
        private editor: EditorService
    ) {
        this.success$.pipe(
            filter(res => res != null),
            debounceTime(5000),
            takeUntilDestroyed(),
        ).subscribe(() => this.success$.next(null));

        this.failed$.pipe(
            filter(res => res != null),
            debounceTime(5000),
            takeUntilDestroyed(),
        ).subscribe(() => this.failed$.next(null));
    }

    async openEmailEditor() {
        const { EmailComponent } = await import("../../../admin/components/email/email.component");
        this.editor.open(EmailComponent);
    }

    onClose(): void {
        this.success$.next(null);
        this.failed$.next(null);
    }

    onSubmit() {
        this.validating.set(true);

        if (this.form.valid && !this.submitting()) {
            this.submitting.set(true);

            const email: Email = {
                message: this.form.get('message')?.value ?? '',
                sender: this.form.get('sender')?.value ?? '',
                senderType: this.form.get('senderType')?.value ?? '',
                purpose: this.form.get('purpose')?.value ?? ''
            };

            this.email.sendEmail(email).subscribe({
                next: () => this.onSuccess(),
                error: () => this.onFail(),
            });
        }
    }

    private onComplete(): void {
        this.submitting.set(false);
        this.validating.set(false);
    }

    private onSuccess(): void {
        this.success$.next(`thanks for your enquiry!`);
        this.onComplete();
        this.form.reset();
    }

    private onFail(): void {
        this.failed$.next(`something went wrong, please try again later, sorry about this`);
        this.onComplete();
    }
}

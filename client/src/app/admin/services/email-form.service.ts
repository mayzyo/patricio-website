import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, forkJoin, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { EmailConfig } from '../../models/email-config';
import { ProfilePrivate } from '../../models/email-private';
import { ProfilePrivateService } from './profile-private.service';

@Injectable()
export class EmailFormService {
    readonly form = this.fb.group({
        email: ['', Validators.email],
        purpose: [new Array<string>()],
        senderType: [new Array<string>()],
    });

    constructor(
        private fb: FormBuilder,
        private firestore: Firestore,
        private profile: ProfileService,
        private profilePrivate: ProfilePrivateService
    ) {
        this.respondToEmailConfig();
        this.respondToEmailPrivate();
        this.profile.refresh();
    }

    update(): Observable<EmailConfig & { email: string }> {
        const model: EmailConfig = {
            purpose: this.form.get('purpose')?.value ?? [],
            senderType: this.form.get('senderType')?.value ?? [],
        };
        
        const privateModel: ProfilePrivate = {
            email: this.form.get('email')?.value ?? ''
        };

        return forkJoin([
            this.profilePrivate.update(privateModel),
            this.profile.profile$.pipe(
                map(({ id }) => doc(this.firestore, 'profile', id ?? '')),
                switchMap(targetDoc => from(updateDoc(targetDoc, model as any))),
                map(() => model),
                take(1)
            ),
        ]).pipe(
            map(([profilePrivate, emailConfig]) => ({ ...profilePrivate, ...emailConfig }))
        );
    }

    private respondToEmailConfig(): void {
        this.profile.emailConfig$.pipe(takeUntilDestroyed())
            .subscribe(emailConfig => this.form.setValue({
                email: this.form.get('email')?.value ?? '',
                purpose: emailConfig.purpose ?? [],
                senderType: emailConfig.senderType ?? [],
            }));
    }

    private respondToEmailPrivate(): void {
        this.profilePrivate.email$.pipe(takeUntilDestroyed())
            .subscribe(email => this.form.get('email')?.setValue(email));
    }
}

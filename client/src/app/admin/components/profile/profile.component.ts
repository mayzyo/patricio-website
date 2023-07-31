import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { SocialMedia } from 'src/app/models/social-media';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
    standalone: true,
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogFormComponent
    ]
})
export class ProfileComponent implements OnInit {
    protected readonly form = new FormGroup({
        email: new FormControl({ value: '', disabled: true }, [Validators.required]),
        facebook: new FormControl({ value: '', disabled: true }),
        linkedIn: new FormControl({ value: '', disabled: true }),
        instagram: new FormControl({ value: '', disabled: true }),
        weChat: new FormControl({ value: '', disabled: true }),
        weibo: new FormControl({ value: '', disabled: true })
    });
    protected submitting = false;

    constructor(private profile: ProfileService) {}

    ngOnInit() {
        this.initialiseForm();
    }

    onSubmit() {
        if (this.form.valid && !this.submitting) {
            this.form.disable();
            this.submitting = true;
            
            const socialMediaModel = this.buildSocialMediaModel(this.form);
            const email = this.form.get('email')?.value ?? 'ERROR';
            this.profile.update(socialMediaModel, email).subscribe(() => {
                this.form.enable();
                this.submitting = false;
            });
        }
    }

    private initialiseForm(): void {
        combineLatest({
            socialMedia: this.profile.socialMedia$,
            email: this.profile.email$
        }).subscribe(({ socialMedia, email }) => {
            this.form.setValue({
                email,
                facebook: socialMedia.facebook ?? '',
                linkedIn: socialMedia.linkedIn ?? '',
                instagram: socialMedia.instagram ?? '',
                weChat: socialMedia.weChat ?? '',
                weibo: socialMedia.weibo ?? '',
            });

            this.form.enable();
        })
    }

    private buildSocialMediaModel(form: FormGroup): SocialMedia {
        return {
            facebook: form.get('facebook')?.value,
            linkedIn: form.get('linkedIn')?.value,
            instagram: form.get('instagram')?.value,
            weChat: form.get('weChat')?.value,
            weibo: form.get('weibo')?.value
        };
    }
}

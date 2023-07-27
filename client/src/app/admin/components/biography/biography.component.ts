import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BiographyService } from 'src/app/shared/services/biography.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
    standalone: true,
    selector: 'app-biography',
    templateUrl: './biography.component.html',
    styleUrls: ['./biography.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogFormComponent
    ]
})
export class BiographyComponent implements OnInit {
    readonly form = new FormGroup({
        content: new FormControl({ value: '', disabled: true })
    });
    submitting = false;

    constructor(private biography: BiographyService) {}

    ngOnInit() {
        this.initialiseForm();
    }

    onSubmit() {
        if (this.form.valid && !this.submitting) {
            this.form.disable();
            this.submitting = true;
            
            this.biography.update(this.form.get('content')?.value ?? 'ERROR').subscribe(() => {
                this.form.enable();
                this.submitting = false;
            });
        }
    }

    private initialiseForm(): void {
        this.biography.raw$.subscribe(data => {
            const content = this.form.get('content');
            content?.setValue(data);
            content?.enable();
        })
    }
}

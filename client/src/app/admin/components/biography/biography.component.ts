import { ChangeDetectionStrategy, Component, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { BiographyFormService } from '../../services/biography-form.service';

@Component({
    selector: 'app-biography',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EditorModalComponent,
    ],
    templateUrl: './biography.component.html',
    styleUrl: './biography.component.scss',
    providers: [BiographyFormService]
})
export class BiographyComponent {
    protected readonly form = this.biographyForm.form;

    protected readonly pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);

    constructor(private destroyRef: DestroyRef, private biographyForm: BiographyFormService) { }

    protected onSubmit(): void {
        this.validating.set(true);

        if(this.form.valid && !this.submitting()) {
            this.submitting.set(true);
            
            this.biographyForm.update()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onComplete());
        }
    }

    private onComplete(): void {
        this.submitting.set(false);
        this.validating.set(false);
        this.form.markAsPristine();
    }
}

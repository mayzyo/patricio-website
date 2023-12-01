import { ChangeDetectionStrategy, Component, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { map } from 'rxjs/operators';
import { EmailFormService } from '../../services/email-form.service';
import { EditableListComponent } from '../editable-list/editable-list.component';
import { ProfilePrivateService } from '../../services/profile-private.service';

@Component({
    selector: 'app-email',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, EditorModalComponent, EditableListComponent],
    templateUrl: './email.component.html',
    styleUrl: './email.component.scss',
    providers: [EmailFormService, ProfilePrivateService]
})
export class EmailComponent {
    protected readonly form = this.emailForm.form;

    protected readonly pristine = toSignal(this.form.statusChanges.pipe(map(() => this.form.pristine)));
    protected readonly submitting = signal(false);
    protected readonly validating = signal(false);

    constructor(
        private destroyRef: DestroyRef,
        private emailForm: EmailFormService
    ) { }

    protected onSubmit(): void {
        this.validating.set(true);

        if (this.form.valid && !this.submitting()) {
            this.submitting.set(true);

            this.emailForm.update()
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

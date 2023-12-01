import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const eventRequiredValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const isEvent = control.get('isEvent');
    const thumbnail = control.get('thumbnail');
    const link = control.get('link');
    const date = control.get('date');

    if(!isEvent?.value) {
        return null;
    }

    return !link?.value || !thumbnail?.value || !date?.value
        ? { require: true }
        : null;
};
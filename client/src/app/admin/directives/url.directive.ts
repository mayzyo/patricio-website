import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

export const urlValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {

    if(!control.value || control.value === '') {
        return null;
    }

    return Validators.pattern(urlRegex);
};
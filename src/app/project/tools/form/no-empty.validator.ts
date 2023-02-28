import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NoEmptyValidator {
    static noEmpty(control: AbstractControl): ValidationErrors | null {
        var word = (control.value || '') as string;
        if (word != '') {
            if (word.trim() === '') {
                return { noEmpty: true };
            }
        }
        return null;
    }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace Validator {
  export const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  export function password(controlName: string = 'password', firstNameControlName: string = 'firstName', lastNameControlName: string = 'lastName'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const passwordFormControl = control.get(controlName);
      const {
        [controlName]: passwordValue,
        [firstNameControlName]: firstNameValue,
        [lastNameControlName]: lastNameValue,
      } = control.value;
      const isLengthValid = passwordValue.length >= 8;
      const hasUpperCaseLetter = passwordValue.match(/[A-Z]/);
      const hasLowerCaseLetter = passwordValue.match(/[a-z]/);
      const isFirstNameOrLastNameValueIncluded = [firstNameValue, lastNameValue].some((value: string) => value && passwordValue.includes(value));

      if (!passwordValue?.length) {
        return null;
      }

      if (!isLengthValid || !hasUpperCaseLetter || !hasLowerCaseLetter || isFirstNameOrLastNameValueIncluded) {
        passwordFormControl?.setErrors({ invalidFormat: true });
        passwordFormControl?.markAsTouched();
        return { invalidFormat: true };
      } else {
        passwordFormControl?.clearValidators();
        passwordFormControl?.markAsUntouched();
        return null;
      }
    }
  }
}

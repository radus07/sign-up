import { AbstractControl, ValidatorFn } from '@angular/forms';

//todo: rename to domain specific
export namespace SignUpValidators {
  export const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  export function containsUpperCaseLetter(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const containsUpperCaseLetter = control.value?.match(/[A-Z]/);

      if (!control.value?.length) {
        return null;
      }

      if (!containsUpperCaseLetter) {
        control.setErrors({ noUpperCase: true });
        control.markAsTouched();
        return { noUpperCase: true };
      }

      control.setErrors({ noUpperCase: false });
      return null;
    }
  }

  export function containsLowerCaseLetter(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const containsLowerCaseLetter = control.value?.match(/[a-z]/);

      if (!control.value?.length) {
        return null;
      }

      if (!containsLowerCaseLetter) {
        control.setErrors({ noLowerCase: true });
        control.markAsTouched();
        return { noLowerCase: true };
      }

      control.setErrors({ noLowerCase: false });
      return null;
    }
  }

  export function notContainsTargetValue(targetControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const targetControl = control.parent?.get(targetControlName);
      const containsTargetValue = targetControl?.value && control.value?.includes(targetControl.value);

      if (!control.value?.length) {
        return null;
      }

      if (containsTargetValue) {
        control.setErrors({ [`${targetControlName}IsIncluded`]: true });
        control.markAsTouched();
        return { [`${targetControlName}IsIncluded`]: true };
      }

      control.setErrors({ [`${targetControlName}IsIncluded`]: false });
      return null;
    }
  }
}

import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormUtilsService {
  public validateFormFields(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control: FormGroup | AbstractControl) => {
      control.updateValueAndValidity();
      control.markAsTouched();

      if (control instanceof FormGroup && control.controls) {
        this.validateFormFields(control);
      }
    });
  }
}

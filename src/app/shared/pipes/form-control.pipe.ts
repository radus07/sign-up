import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({ name: 'formControl' })
export class FormControlPipe implements PipeTransform {
  transform(formGroup: FormGroup, controlName: string): AbstractControl | null {
    return formGroup.get(controlName);
  }
}

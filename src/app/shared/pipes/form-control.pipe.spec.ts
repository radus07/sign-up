import { FormControlPipe } from './form-control.pipe';
import { FormGroup, UntypedFormControl } from '@angular/forms';

describe('FormControlPipe', () => {
  it('should create an instance', () => {
    const pipe = new FormControlPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return form control', () => {
    const formGroup = new FormGroup({
      control: new UntypedFormControl(),
    });
    const control = new FormControlPipe().transform(formGroup, 'control');
    expect(control).toBeTruthy();
  });

  it('should return null', () => {
    const formGroup = new FormGroup({
      control: new UntypedFormControl(),
    });
    const control = new FormControlPipe().transform(formGroup, '');
    expect(control).toBeNull();
  });
});

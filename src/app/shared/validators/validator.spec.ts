import { Validator } from '@shared/validators/validator';
import { FormGroup, UntypedFormControl } from '@angular/forms';

describe('Validator', () => {
  it('email should be valid', () => {
    const email = 'test@test.com';
    expect(email).toMatch(Validator.email);
  });

  it('email should contain invalid local-part', () => {
    const email1 = 'tes@t@test.com';
    const email2 = '@test.com';
    const email3 = 'te st@test.com';
    const email4 = 'te"st@test.com';
    const email5 = 'tes\t@test.com';
    expect(Validator.email.test(email1)).toBe(false);
    expect(Validator.email.test(email2)).toBe(false);
    expect(Validator.email.test(email3)).toBe(false);
    expect(Validator.email.test(email4)).toBe(false);
    expect(Validator.email.test(email5)).toBe(false);
  });

  it('email should contain invalid domain', () => {
    const email1 = 'test@test';
    const email2 = 'test@.com';
    const email3 = 'test@test.com!';
    const email4 = 'test@';
    expect(Validator.email.test(email1)).toBe(false);
    expect(Validator.email.test(email2)).toBe(false);
    expect(Validator.email.test(email3)).toBe(false);
    expect(Validator.email.test(email4)).toBe(false);
  });

  it('email should be invalid', () => {
    const email = 'test@test';
    expect(Validator.email.test(email)).toBe(false);
  });

  it('password should be valid', () => {
    const formGroup = new FormGroup({
      firstName: new UntypedFormControl('First'),
      lastName: new UntypedFormControl('Last'),
      password: new UntypedFormControl('ValidPassword')
    });
    expect(Validator.password()(formGroup)).toEqual(null);
  });

  it('password should be invalid as it\'s length is less than 8', () => {
    const formGroup = new FormGroup({
      password: new UntypedFormControl('Less')
    });
    expect(Validator.password()(formGroup)).toEqual({ invalidFormat: true });
  });

  it('password should be invalid as it contains firstName value', () => {
    const formGroup = new FormGroup({
      firstName: new UntypedFormControl('First'),
      lastName: new UntypedFormControl('Last'),
      password: new UntypedFormControl('LessFirstname')
    });
    expect(Validator.password()(formGroup)).toEqual({ invalidFormat: true });
  });

  it('password should be invalid as it contains lastName value', () => {
    const formGroup = new FormGroup({
      firstName: new UntypedFormControl('First'),
      lastName: new UntypedFormControl('Last'),
      password: new UntypedFormControl('LessLastname')
    });
    expect(Validator.password()(formGroup)).toEqual({ invalidFormat: true });
  });
});

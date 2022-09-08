import { SignUpValidators } from './sign-up-validators';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

describe('Sign up validator', () => {

  describe('Email', () => {
    it('email should be valid', () => {
      const email = 'test@test.com';

      expect(email).toMatch(SignUpValidators.email);
    });

    it('email should contain invalid local-part', () => {
      const email1 = 'tes@t@test.com';
      const email2 = '@test.com';
      const email3 = 'te st@test.com';
      const email4 = 'te"st@test.com';
      const email5 = 'tes\t@test.com';

      expect(SignUpValidators.email.test(email1)).toBe(false);
      expect(SignUpValidators.email.test(email2)).toBe(false);
      expect(SignUpValidators.email.test(email3)).toBe(false);
      expect(SignUpValidators.email.test(email4)).toBe(false);
      expect(SignUpValidators.email.test(email5)).toBe(false);
    });

    it('email should contain invalid domain', () => {
      const email1 = 'test@test';
      const email2 = 'test@.com';
      const email3 = 'test@test.com!';
      const email4 = 'test@';

      expect(SignUpValidators.email.test(email1)).toBe(false);
      expect(SignUpValidators.email.test(email2)).toBe(false);
      expect(SignUpValidators.email.test(email3)).toBe(false);
      expect(SignUpValidators.email.test(email4)).toBe(false);
    });

    it('email should be invalid', () => {
      const email = 'test@test';
      expect(SignUpValidators.email.test(email)).toBe(false);
    });
  });

  describe('containsUpperCaseLetter', () => {
    it('should pass as it contains at least one upper case letter', () => {
      const formControl = new FormControl('Test');

      expect(SignUpValidators.containsUpperCaseLetter()(formControl)).toEqual(null);
    });

    it('should return error', () => {
      const formControl = new FormControl('test');

      expect(SignUpValidators.containsUpperCaseLetter()(formControl)).toEqual({ noUpperCase: true });
    });

    it('should return when no value', () => {
      const formControl = new FormControl();

      expect(SignUpValidators.containsUpperCaseLetter()(formControl)).toEqual(null);
    });
  });

  describe('containsLowerCaseLetter', () => {
    it('should pass as it contains at least one lower case letter', () => {
      const formControl = new FormControl('Test');

      expect(SignUpValidators.containsLowerCaseLetter()(formControl)).toEqual(null);
    });

    it('should return error', () => {
      const formControl = new FormControl('TEST');

      expect(SignUpValidators.containsLowerCaseLetter()(formControl)).toEqual({ noLowerCase: true });
    });

    it('should return when no value', () => {
      const formControl = new FormControl();

      expect(SignUpValidators.containsLowerCaseLetter()(formControl)).toEqual(null);
    });
  });

  describe('notContainsTargetValue', () => {
    it('should pass as it does not contain target value', () => {
      const formGroup = new FormGroup({
        control: new FormControl('Test'),
        targetControl: new FormControl('Target'),
      });

      expect(SignUpValidators.notContainsTargetValue('targetControl')(formGroup.get('control') as AbstractControl)).toEqual(null);
    });

    it('should return error as it contains target value', () => {
      const formGroup = new FormGroup({
        control: new FormControl('TestTarget'),
        targetControl: new FormControl('Target'),
      });

      expect(SignUpValidators.notContainsTargetValue('targetControl')(formGroup.get('control') as AbstractControl)).toEqual({ ['targetControlIsIncluded']: true });
    });

    it('should return when no value', () => {
      const formGroup = new FormGroup({
        control: new FormControl(),
        targetControl: new FormControl('Target'),
      });

      expect(SignUpValidators.notContainsTargetValue('targetControl')(formGroup.get('control') as AbstractControl)).toEqual(null);
    });
  });
});

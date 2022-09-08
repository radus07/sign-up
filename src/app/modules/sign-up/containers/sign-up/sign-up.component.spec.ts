import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '@modules/sign-up/services/user.service';
import { SignUpComponent } from '@modules/sign-up/containers/sign-up/sign-up.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subscription } from 'rxjs';
import { SharedModule } from '@shared/shared.module';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule, HttpClientTestingModule, SharedModule],
      providers: [UserService, MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe onDestroy', () => {
    const spy = jest.spyOn(Subscription.prototype, 'unsubscribe');
    Object.defineProperty(component.formGroup, 'valid', {
      get: () => true,
    });
    component.handleFormSubmit();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should not unsubscribe onDestroy', () => {
    component.ngOnDestroy();
    expect(component['subscription']).toBeNull();
  });

  it('formGroup should be created', () => {
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup.contains('firstName')).toBeTruthy();
    expect(component.formGroup.contains('lastName')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('password')).toBeTruthy();
  });

  it('on form submit, formGroup should be marked as invalid', () => {
    jest.spyOn(component.formGroup, 'markAllAsTouched');
    component.handleFormSubmit();
    expect(component.formGroup.invalid).toEqual(true);
    expect(component.formGroup.markAllAsTouched).toHaveBeenCalled();
  });

  it('on form submit, userService.save() should be called and form should be reset', () => {
    jest.spyOn(userService, 'save').mockReturnValue(of(true));
    jest.spyOn(component.formGroup, 'reset');
    Object.defineProperty(component.formGroup, 'valid', {
      get: () => true,
    });
    component.handleFormSubmit();
    expect(userService.save).toHaveBeenCalled();
    userService.save({
      firstName: 'T',
      lastName: 'T',
      email: 't@t.t',
      password: ' T',
    }).subscribe((result: boolean) => {
      expect(result).toEqual(true);
      expect(component.formGroup.reset).toHaveBeenCalled()
    });
    expect(component['subscription']).toBeTruthy();
  });

  it('on form submit, userService.save() should be called and response should be false', () => {
    jest.spyOn(userService, 'save').mockReturnValue(of(false));
    Object.defineProperty(component.formGroup, 'valid', {
      get: () => true,
    });
    component.handleFormSubmit();
    userService.save({
      firstName: 'T',
      lastName: 'T',
      email: 't@t.t',
      password: ' T',
    }).subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
  });
});

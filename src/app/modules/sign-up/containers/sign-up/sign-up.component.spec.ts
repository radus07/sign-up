import { SignUpComponent } from '@modules/sign-up/containers/sign-up/sign-up.component';
import { UserService } from '@modules/sign-up/services/user.service';
import { FormBuilder } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { of, Subscription } from 'rxjs';
import { FormUtilsService } from '@shared/services/form-utils.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let userService: UserService;
  let formUtilsService: FormUtilsService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    userService = MockService(UserService);
    formUtilsService = MockService(FormUtilsService);
    formBuilder = new FormBuilder();
    component = new SignUpComponent(userService, formBuilder, formUtilsService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleFormSubmit', () => {
    it('should save the user when form is valid and reset the form when user request is successfully executed', () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(true);
      jest.spyOn(component.formGroup, 'reset');
      jest.spyOn(userService, 'save').mockReturnValue(of(true));
      const initialFormGroupValue = component.formGroup.getRawValue();

      component.handleFormSubmit();

      expect(userService.save).toHaveBeenCalledWith(initialFormGroupValue);
      expect(component.formGroup.reset).toHaveBeenCalled();
    });

    it('should save the user but not reset the form when user request failed', () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(true);
      jest.spyOn(component.formGroup, 'reset');
      jest.spyOn(userService, 'save').mockReturnValue(of(false));

      expect(component.formGroup.reset).not.toHaveBeenCalled();
    });

    it('should mark entire form as touch when form is invalid', () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(false);
      jest.spyOn(formUtilsService, 'validateFormFields');

      component.handleFormSubmit();

      expect(formUtilsService.validateFormFields).toHaveBeenCalledWith(component.formGroup);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe onDestroy', () => {
      const spy = jest.spyOn(Subscription.prototype, 'unsubscribe');
      jest.spyOn(userService, 'save').mockReturnValue(of(false));
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(true);

      component.handleFormSubmit();
      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });

    it('should not unsubscribe onDestroy', () => {
      component.ngOnDestroy();

      expect(component['subscription']).toBeNull();
    });
  });
});

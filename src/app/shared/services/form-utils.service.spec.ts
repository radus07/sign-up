import { FormUtilsService } from './form-utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('FormUtilsService', () => {
  let service: FormUtilsService;

  beforeEach(() => {
    service = new FormUtilsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateFormFields', () => {
    it('should trigger validators and mark fields as touched', () => {
      const formGroup = new FormGroup({
        control: new FormControl(),
        group: new FormGroup(({
          control: new FormControl('', Validators.required),
        })),
      });
      service.validateFormFields(formGroup);

      expect(formGroup.touched).toEqual(true);
      expect(formGroup.invalid).toEqual(true);
    });
  })
});

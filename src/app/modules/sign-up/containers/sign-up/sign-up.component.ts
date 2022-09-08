import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '@modules/sign-up/services/user.service';
import { SignUpValidators } from '@modules/sign-up/validators/sign-up-validators';
import { FormUtilsService } from '@shared/services/form-utils.service';
import { SingUpForm } from '@modules/sign-up/models/sing-up-form.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
  public formGroup: SingUpForm;
  private subscription: Subscription | null = null;

  constructor(
    public readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly formUtilsService: FormUtilsService,
  ) {
    this.formGroup = this.buildSignUpForm();
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public handleFormSubmit(): void {
    if (this.formGroup.valid) {
      this.subscription = this.userService.save(this.formGroup.getRawValue()).subscribe((isSaved: boolean) => (isSaved && this.formGroup.reset()));
    } else {
      this.formUtilsService.validateFormFields(this.formGroup);
    }
  }

  private buildSignUpForm(): FormGroup {
    return this.formBuilder.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(SignUpValidators.email)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        SignUpValidators.containsUpperCaseLetter(),
        SignUpValidators.containsLowerCaseLetter(),
        SignUpValidators.notContainsTargetValue('firstName'),
        SignUpValidators.notContainsTargetValue('lastName'),
      ]],
    });
  }
}

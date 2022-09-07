import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '@modules/sign-up/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy {
  public formGroup: FormGroup;
  private subscription: Subscription | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
  ) {
    this.formGroup = this.buildSignUpForm();
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public handleFormSubmit(): void {
    if (this.formGroup.valid) {
      this.subscription = this.userService.save(this.formGroup.value).subscribe((isSaved: boolean) => (isSaved && this.formGroup.reset()));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private buildSignUpForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
}

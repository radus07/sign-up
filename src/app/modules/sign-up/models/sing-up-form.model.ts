import { FormControl, FormGroup } from '@angular/forms';

export type SingUpForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}>

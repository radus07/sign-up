import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignUpComponent } from '@modules/sign-up/containers/sign-up/sign-up.component';
import { SignUpRoutingModule } from '@modules/sign-up/sign-up-routing.module';
import { UserService } from '@modules/sign-up/services/user.service';

@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SignUpRoutingModule,
    SharedModule,
  ],
  providers: [UserService],
})
export class SignUpModule {}

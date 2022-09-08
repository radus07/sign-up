import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormComponent } from '@shared/components/form/form.component';
import { FormControlPipe } from './pipes/form-control.pipe';

@NgModule({
  declarations: [
    FormComponent,
    FormControlPipe,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    FormComponent,
    FormControlPipe,
  ],
})
export class SharedModule {}

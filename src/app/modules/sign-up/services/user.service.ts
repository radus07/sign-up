import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@modules/sign-up/models/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly snackBar: MatSnackBar,
  ) {}

  save(user: User): Observable<boolean> {
    this.snackBar.open('WIP!', '', { duration: 5000 });
    return of(true);
  }
}

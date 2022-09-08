import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@modules/sign-up/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class UserService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private readonly apiEndpoint: string = 'users';

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly httpClient: HttpClient,
  ) {}

  save(user: User): Observable<boolean> {
    this.loadingSubject.next(true);

    return this.httpClient.post(`${environment.apiUrl}${this.apiEndpoint}`, user).pipe(
      map(() => {
        this.snackBar.open('User have been successfully saved!', '', { duration: 5000 });

        return true;
      }),
      catchError(() => {
        this.snackBar.open('Something went wrong. Please try again!', '', { duration: 5000 });

        return of(false);
      }),
      finalize(() => this.loadingSubject.next(false)),
    )
  }
}

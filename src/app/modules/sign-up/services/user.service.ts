import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@modules/sign-up/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private readonly apiEndpoint: string = 'users';

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly httpClient: HttpClient,
    private readonly translateService: TranslateService,
  ) {}

  save(user: User): Observable<boolean> {
    this.loadingSubject.next(true);
    let responseMessageKey = 'userSuccessfullySaved';

    return this.httpClient.post(`${environment.apiUrl}${this.apiEndpoint}`, user).pipe(
      map(() => {
        this.snackBar.open('', '', { duration: 5000 });

        return true;
      }),
      catchError(() => {
        responseMessageKey = 'error';

        return of(false);
      }),
      finalize(() => {
        this.snackBar.open(this.translateService.instant(`signUp.${responseMessageKey}.label`), '', { duration: 5000 });
        this.loadingSubject.next(false)
      }),
    )
  }
}

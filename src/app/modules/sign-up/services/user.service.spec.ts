import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@modules/sign-up/services/user.service';
import { environment } from '@env/environment';
import { MockService } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { User } from '@modules/sign-up/models/user.model';
import { TranslateService } from '@ngx-translate/core';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let snackBar: MatSnackBar;
  let translateService: TranslateService;
  let user: User;
  const apiUrl = `${environment.apiUrl}users`;

  beforeEach(() => {
    user = {} as User;
    snackBar = MockService(MatSnackBar);
    httpClient = MockService(HttpClient);
    translateService = MockService(TranslateService);
    service = new UserService(snackBar, httpClient, translateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('save', () => {
    it('should request api endpoint', () => {
      const spy = jest.fn();
      const spyLoading = jest.fn();

      jest.spyOn(httpClient, 'post').mockReturnValue(of(true));
      jest.spyOn(snackBar, 'open');
      jest.spyOn(translateService, 'instant').mockReturnValue('User have been successfully saved!');

      service.loading$.subscribe(spyLoading)
      service.save(user).subscribe(spy);

      expect(httpClient.post).toHaveBeenCalledWith(apiUrl, user);
      expect(spy).toHaveBeenCalledWith(true);

      expect(snackBar.open).toHaveBeenCalledWith(translateService.instant(''), '', { duration: 5000 });
      expect(spyLoading.mock.calls).toEqual([[false], [true], [false]]);
    });

    it('should fail', () => {
      const spy = jest.fn();
      const spyLoading = jest.fn();

      jest.spyOn(httpClient, 'post').mockReturnValue(throwError(() => new Error()));
      jest.spyOn(snackBar, 'open');
      jest.spyOn(translateService, 'instant').mockReturnValue('Something went wrong. Please try again!');

      service.loading$.subscribe(spyLoading)
      service.save(user).subscribe(spy);

      expect(httpClient.post).toHaveBeenCalledWith(apiUrl, user);
      expect(spy).toHaveBeenCalledWith(false);

      expect(snackBar.open).toHaveBeenCalledWith(translateService.instant(''), '', { duration: 5000 });
      expect(spyLoading.mock.calls).toEqual([[false], [true], [false]]);
    });
  });
});

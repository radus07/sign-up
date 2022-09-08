import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@modules/sign-up/services/user.service';
import { environment } from '@env/environment';
import { MockService } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { User } from '@modules/sign-up/models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let snackBar: MatSnackBar;
  let user: User;
  const apiUrl = `${environment.apiUrl}users`;

  beforeEach(() => {
    user = {} as User;
    snackBar = MockService(MatSnackBar);
    httpClient = MockService(HttpClient);
    service = new UserService(snackBar, httpClient);
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

      service.loading$.subscribe(spyLoading)
      service.save(user).subscribe(spy);

      expect(httpClient.post).toHaveBeenCalledWith(apiUrl, user);
      expect(spy).toHaveBeenCalledWith(true);

      expect(snackBar.open).toHaveBeenCalledWith('User have been successfully saved!', '', { duration: 5000 });
      expect(spyLoading.mock.calls).toEqual([[false], [true], [false]]);
    });

    it('should fail', () => {
      const spy = jest.fn();
      const spyLoading = jest.fn();

      jest.spyOn(httpClient, 'post').mockReturnValue(throwError(() => new Error()));
      jest.spyOn(snackBar, 'open');

      service.loading$.subscribe(spyLoading)
      service.save(user).subscribe(spy);

      expect(httpClient.post).toHaveBeenCalledWith(apiUrl, user);
      expect(spy).toHaveBeenCalledWith(false);

      expect(snackBar.open).toHaveBeenCalledWith('Something went wrong. Please try again!', '', { duration: 5000 });
      expect(spyLoading.mock.calls).toEqual([[false], [true], [false]]);
    });
  });
});

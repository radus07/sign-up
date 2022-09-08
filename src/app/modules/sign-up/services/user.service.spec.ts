import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '@modules/sign-up/services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpTestingController;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      providers: [UserService, MatSnackBar],
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true and open the snackBar with success message', async () => {
    jest.spyOn(snackBar, 'open');
    service.save({
      firstName: 'T',
      lastName: 'T',
      email: 't@t.t',
      password: ' T',
    }).subscribe(response => expect(response).toEqual(true));

    const request = httpClient.expectOne(`${environment.apiUrl}users`);
    request.flush(true);
    httpClient.verify();
    expect(snackBar.open).toHaveBeenCalledWith('User have been successfully saved!', '', { duration: 5000 });
  });

  it('should return false and open the snackBar with error message', async () => {
    jest.spyOn(snackBar, 'open');
    service.save({
      firstName: 'T',
      lastName: 'T',
      email: 't@t.t',
      password: ' T',
    }).subscribe(response => expect(response).toEqual(false));

    const request = httpClient.expectOne(`${environment.apiUrl}users`);
    request.error(new ProgressEvent('failed'));
    httpClient.verify();
    expect(snackBar.open).toHaveBeenCalledWith('Something went wrong. Please try again!', '', { duration: 5000 });
  });
});

import { ResetPasswordService } from './reset-password.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ApiServiceBase } from 'src/app/shared/services/api/api-service-base';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiServiceBase]
    })
  );

  beforeEach(() => {
    service = TestBed.get(ResetPasswordService);
    const apiService = TestBed.get(ApiServiceBase);
    apiUrl = apiService.buildUrl() + 'auth';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('requestResetPassword', () => {
    beforeEach(() => {
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should form a POST request to auth/password with provided user login', () => {
      const userName = 'testUser';

      // act
      service.requestResetPassword(userName).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/password`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ userLogin: userName });
    });

    it('should return true when successfully generated and sent password reset link', () => {
      const userName = 'testUser';

      // act
      service
        .requestResetPassword(userName)
        .subscribe((responseValue) => expect(responseValue).toBeTrue());

      const req = httpMock
        .expectOne(`${apiUrl}/password`)
        .flush({ success: true });
    });

    it('should return false when successfully generated and sent password reset link', () => {
      const userName = 'testUser';

      // act
      service
        .requestResetPassword(userName)
        .subscribe((responseValue) => expect(responseValue).toBeFalse());

      const req = httpMock
        .expectOne(`${apiUrl}/password`)
        .flush({ success: false });
    });
  });

  describe('changePassword', () => {
    const userName = 'testUser';
    const password = 'abc123';

    beforeEach(() => {
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should form a PUT request to auth/password with provided user login and newPassword', () => {
      // act
      service.changePassword(userName, password).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/password`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual({
        login: userName,
        newPassword: password
      });
    });

    it('should return true when successfully generated and sent password reset link', () => {
      service
        .changePassword(userName, password)
        .subscribe((responseValue) => expect(responseValue).toBeTrue());

      const req = httpMock
        .expectOne(`${apiUrl}/password`)
        .flush({ success: true });
    });

    it('should return false when successfully generated and sent password reset link', () => {
      service
        .changePassword(userName, password)
        .subscribe((responseValue) => expect(responseValue).toBeFalse());

      const req = httpMock
        .expectOne(`${apiUrl}/password`)
        .flush({ success: false });
    });

    it('should include oldPassword field when a value is provided', () => {
      const oldPassword = 'w3akpa$$word';
      service.changePassword(userName, password, oldPassword).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/password`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual({
        login: userName,
        newPassword: password,
        oldPassword
      });
    });
  });

  describe('isValidToken', () => {
    it('should return false when null token is provided', () => {
      const token = null;
      const result = service.isValidToken(token);
      expect(result).toBeFalse();
    });

    it('should return false when undefined token is provided', () => {
      let token;
      const result = service.isValidToken(token);
      expect(result).toBeFalse();
    });

    it('should return false when errant token is provided', () => {
      const token = 'badToken';
      const result = service.isValidToken(token);
      expect(result).toBeFalse();
    });

    it('should return true when legitimate token is provided', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU5MzI2MDQ5NTksInVzZXJfaWQiOiI1ZjFmM2FjNmU3MzhhZDBmNDI2MmRiNzUiLCJzdWIiOiJka3J1ZXBAc2JjZ2xvYmFsLm5ldCIsImdpdmVuX25hbWUiOiJEZW5ueSIsImZhbWlseV9uYW1lIjoiSyIsImVtYWlsIjoiZGtydWVwQHNiY2dsb2JhbC5uZXQiLCJvdHUiOiI1ZjFmZmMzOGU3MzhhZGVhMzE2MmRiNzgifQ==.CktsPdLQrUu+5oHwY7bpNzbygSEg2cUnBEKoKLk/EKA';
      const result = service.isValidToken(token);
      expect(result).toBeTrue();
    });
  });

  describe('extractUserLogin', () => {
    it('should return empty string when provided invalid token', () => {
      const invalidToken = 'abc123';
      const result = service.extractUserLogin(invalidToken);
      expect(result).toEqual('');
    });

    it('should return the `email` grant of valid token', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU5MzI2MDQ5NTksInVzZXJfaWQiOiI1ZjFmM2FjNmU3MzhhZDBmNDI2MmRiNzUiLCJzdWIiOiJka3J1ZXBAc2JjZ2xvYmFsLm5ldCIsImdpdmVuX25hbWUiOiJEZW5ueSIsImZhbWlseV9uYW1lIjoiSyIsImVtYWlsIjoiZGtydWVwQHNiY2dsb2JhbC5uZXQiLCJvdHUiOiI1ZjFmZmMzOGU3MzhhZGVhMzE2MmRiNzgifQ==.CktsPdLQrUu+5oHwY7bpNzbygSEg2cUnBEKoKLk/EKA';
      const result = service.extractUserLogin(token);
      expect(result).toEqual('dkruep@sbcglobal.net');
    });
  });
});

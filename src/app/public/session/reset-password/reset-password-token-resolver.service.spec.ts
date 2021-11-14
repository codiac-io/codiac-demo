import { TestBed } from '@angular/core/testing';

import { ResetPasswordTokenResolverService, ResolvedResetPasswordRequest } from './reset-password-token-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';


const INVALID_TOKEN = 'abc123';
const VALID_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU5MzI2MDQ5NTksInVzZXJfaWQiOiI1ZjFmM2FjNmU3MzhhZDBmNDI2MmRiNzUiLCJzdWIiOiJka3J1ZXBAc2JjZ2xvYmFsLm5ldCIsImdpdmVuX25hbWUiOiJEZW5ueSIsImZhbWlseV9uYW1lIjoiSyIsImVtYWlsIjoiZGtydWVwQHNiY2dsb2JhbC5uZXQiLCJvdHUiOiI1ZjFmZmMzOGU3MzhhZGVhMzE2MmRiNzgifQ==.CktsPdLQrUu+5oHwY7bpNzbygSEg2cUnBEKoKLk/EKA';

let testTokenSelector = 'dummy';
const tokenProvider = () => {
  if (testTokenSelector === 'dummy'){
    return INVALID_TOKEN;
  }

  if (testTokenSelector === 'noToken') {
    return undefined;
  }

  if (testTokenSelector === 'validToken') {
    return VALID_TOKEN;
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get(paramName) {
        if (paramName === 'token') {
          return tokenProvider();
        }
      }
    }
  };
}

describe('ResetPasswordTokenResolverService', () => {
  let service: ResetPasswordTokenResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useClass: MockActivatedRoute }],
    });

    service = TestBed.get(ResetPasswordTokenResolverService);
  });

  it('should be created', () => {
    service = TestBed.get(ResetPasswordTokenResolverService);
    expect(service).toBeTruthy();
  });


  describe('collectToken', () => {
    let route: ActivatedRoute;

    beforeEach(() => {
      route = TestBed.get(ActivatedRoute);
    });

    it('should collect the one time use token from the route', () => {
      testTokenSelector = 'dummy';
      service = TestBed.get(ResetPasswordTokenResolverService);

      const result = service['collectToken'](route.snapshot);
      expect(result).toEqual(INVALID_TOKEN);
    });
  });

  describe('resolve', () => {
    let router: Router;
    let location: Location;

    let activatedRoute: ActivatedRoute;
    let state: RouterStateSnapshot;

    beforeEach(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      activatedRoute = TestBed.get(ActivatedRoute);
      state = { root: activatedRoute.snapshot, url: ''};
    });

    describe('given bad token', () => {
      describe('when invalid token provided', () => {
        it('should return an object with error key set', () => {
          testTokenSelector = 'dummy';
          const resolvedValue: ResolvedResetPasswordRequest = service.resolve(activatedRoute.snapshot, state) as ResolvedResetPasswordRequest;
          expect(resolvedValue.error).not.toBeUndefined();
          expect(resolvedValue.error).toEqual('Invalid password reset token provided')
          expect(resolvedValue.login).toEqual('')
          expect(resolvedValue.oneTimeUseAuthToken).toEqual('')
        });
      })

      describe('when no token provided', () => {
        it('should return an object with error key set', () => {
          testTokenSelector = 'noToken';
          const resolvedValue: ResolvedResetPasswordRequest = service.resolve(activatedRoute.snapshot, state) as ResolvedResetPasswordRequest;
          expect(resolvedValue.error).not.toBeUndefined();
          expect(resolvedValue.error).toEqual('Invalid password reset token provided')
          expect(resolvedValue.login).toEqual('')
          expect(resolvedValue.oneTimeUseAuthToken).toEqual('')
        });
      })

    });

    describe('given valid token provided', () => {
      it('should return an object containing the OTU token with extracted User login ID and WITHOUT error key', () => {
        testTokenSelector = 'validToken';
        const resolvedValue: ResolvedResetPasswordRequest = service.resolve(activatedRoute.snapshot, state) as ResolvedResetPasswordRequest;
        expect(resolvedValue.error).toBeUndefined();
        expect(resolvedValue.login).toEqual('dkruep@sbcglobal.net');
        expect(resolvedValue.oneTimeUseAuthToken).toEqual(VALID_TOKEN);
      })
    })



  })

});

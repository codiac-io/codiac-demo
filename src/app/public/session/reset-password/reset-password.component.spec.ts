import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResolvedResetPasswordRequest } from './reset-password-token-resolver.service';
import { By } from '@angular/platform-browser';

const TEST_DUMMY_TOKEN = 'abc123';

const TEST_VALID_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU5MzI2MDQ5NTksInVzZXJfaWQiOiI1ZjFmM2FjNmU3MzhhZDBmNDI2MmRiNzUiLCJzdWIiOiJka3J1ZXBAc2JjZ2xvYmFsLm5ldCIsImdpdmVuX25hbWUiOiJEZW5ueSIsImZhbWlseV9uYW1lIjoiSyIsImVtYWlsIjoiZGtydWVwQHNiY2dsb2JhbC5uZXQiLCJvdHUiOiI1ZjFmZmMzOGU3MzhhZGVhMzE2MmRiNzgifQ==.CktsPdLQrUu+5oHwY7bpNzbygSEg2cUnBEKoKLk/EKA';

const VALID_RESOLVED_DATA: ResolvedResetPasswordRequest = {
  oneTimeUseAuthToken: TEST_VALID_TOKEN,
  login: 'dkruep@sbcglobal.net'
};

const VALID_RESOLVER_DATA = {
  resetPasswordRequestParams: VALID_RESOLVED_DATA
};

const testRouteResolverData = new BehaviorSubject<{
  resetPasswordRequestParams: ResolvedResetPasswordRequest
}>(VALID_RESOLVER_DATA);

const TEST_ERROR_MESSAGE = 'Bad request';

const INVALID_RESOLVED_DATA: ResolvedResetPasswordRequest = {
  oneTimeUseAuthToken: '',
  login: '',
  error: TEST_ERROR_MESSAGE
};

const INVALID_RESOLVER_DATA = {
  resetPasswordRequestParams: INVALID_RESOLVED_DATA
};

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get() {
        return TEST_DUMMY_TOKEN;
      }
    }
  };
  data = testRouteResolverData.asObservable();
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatPasswordStrengthModule,
        OverlayModule,
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [{ provide: ActivatedRoute, useClass: MockActivatedRoute }],
      declarations: [ResetPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    const testUserName = 'test@codiac.io';
    const testPassword = 'pa$$word!';

    it('should form a request to reset-password service completeResetPassword operation with form password value and userName provided', fakeAsync(() => {
      spyOn(
        component['resetPasswordService'],
        'completeResetPassword'
      ).and.returnValue(new Observable());

      // simulate state of login and password
      component['oneTimeUseAuthToken'] = TEST_DUMMY_TOKEN;
      component['userLogin'] = testUserName;
      component.formControls.password.setValue(testPassword);

      component.onSubmit();

      expect(
        component['resetPasswordService'].completeResetPassword
      ).toHaveBeenCalledWith(testUserName, testPassword, TEST_DUMMY_TOKEN);
    }));

    it('should call onSuccess when service request returns true', () => {
      spyOn(
        component['resetPasswordService'],
        'completeResetPassword'
      ).and.returnValue(of(true));

      spyOn(component, 'onSuccess');

      // simulate state of login and password
      component['oneTimeUseAuthToken'] = TEST_DUMMY_TOKEN;
      component['userLogin'] = testUserName;
      component.formControls.password.setValue(testPassword);

      component.onSubmit();

      expect(component.onSuccess).toHaveBeenCalled();
    });

    it('should call onFailed when service request returns false', () => {
      spyOn(
        component['resetPasswordService'],
        'completeResetPassword'
      ).and.returnValue(of(false));

      // simulate state of login and password
      component['oneTimeUseAuthToken'] = TEST_DUMMY_TOKEN;
      component['userLogin'] = testUserName;
      component.formControls.password.setValue(testPassword);

      spyOn(component, 'onSuccess');
      spyOn(component, 'onFailed');

      component.onSubmit();

      expect(component.onSuccess).not.toHaveBeenCalled();
      expect(component.onFailed).toHaveBeenCalled();
    });
  });

  describe('reset password service response handlers', () => {
    let router: Router;
    let location: Location;

    beforeEach(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      router.initialNavigation();
    });

    describe('onFailed', () => {
      it('should notify user of failed attempt', () => {
        spyOn(component['notification'], 'error');
        component.onFailed();
        expect(component['notification'].error).toHaveBeenCalled();
      });

      it('should remain on the reset password page', fakeAsync(() => {
        expect(location.path()).toBe('');
        component.onFailed();
        tick();
        expect(location.path()).toBe('');
      }));
    });

    describe('onSuccess', () => {
      it('should notify user of successful reset attempt', () => {
        spyOn(component['notification'], 'success');
        spyOn(component['router'], 'navigateByUrl');
        component.onSuccess();
        expect(component['notification'].success).toHaveBeenCalled();
      });

      it('should automatically route to the login page', fakeAsync(() => {
        spyOn(component['notification'], 'success');
        spyOn(router, 'navigateByUrl');
        component.onSuccess();
        expect(router.navigateByUrl).toHaveBeenCalledWith('../login');
      }));
    });
  });

  describe('ngOnInit', () => {
    describe('when errant reset password parameters provided', () => {
      beforeEach(() => {
        // setup failed resolved
        testRouteResolverData.next(INVALID_RESOLVER_DATA);
        fixture.detectChanges();
      });

      it('should display the resolved error message by setting local `error` property', () => {
        expect(component.error).not.toBeUndefined();
        expect(component.error).toEqual(TEST_ERROR_MESSAGE);
      });

      it('should NOT present the Reset Password Form', () => {
        const viewForm = fixture.debugElement.query(By.css('form'));
        // query for form fields and ensure do not exist
        expect(viewForm).toBeNull();
      });
    });

    describe('given VALID reset password request', () => {
      beforeEach(() => {
        // setup failed resolved
        testRouteResolverData.next(VALID_RESOLVER_DATA);
        fixture.detectChanges();
      });

      it('should NOT set error property', () => {
        expect(component.error).toBeUndefined();
      });

      it('should set local properties `oneTimeUseAuthToken` and `login`', () => {
        expect(component.userLogin).not.toBeUndefined();
        expect(component.oneTimeUseAuthToken).not.toBeUndefined();
        expect(component.userLogin).toEqual(VALID_RESOLVED_DATA.login);
        expect(component.oneTimeUseAuthToken).toEqual(
          VALID_RESOLVED_DATA.oneTimeUseAuthToken
        );
      });

      it('should present the reset password form', () => {
        fixture.detectChanges();
        const viewForm = fixture.debugElement.query(By.css('form'));
        expect(viewForm).not.toBeNull();
      });
    });
  });
});

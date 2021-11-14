import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, Subject } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { filter, map, take } from 'rxjs/operators';
import { ResetPasswordService } from './reset-password.service';
import { MessageService } from 'src/app/shared/components/message/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedResetPasswordRequest } from './reset-password-token-resolver.service';

@Component({
  selector: 'bds-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private _validPassword: BehaviorSubject<boolean> = new BehaviorSubject(false);
  validPassword$ = this._validPassword.asObservable();

  public error: string;

  private _userLogin = '';
  private _token;

  get userLogin() {
    return this._userLogin;
  }

  set userLogin(userLogin: string) {
    this._userLogin = userLogin;
  }

  get oneTimeUseAuthToken() {
    return this._token;
  }

  set oneTimeUseAuthToken(token: string) {
    this._token = token;
  }

  resetPasswordForm = this.fb.group({
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required]
  });

  get formControls() { return this.resetPasswordForm.controls; }


  apiMessageBsubj: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public get apiMessage$(): Observable<string> {
    return this.apiMessageBsubj.asObservable();
  }

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private notification: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initFormInteraction();
  }

  private initFormInteraction() {

    this.formControls.password.valueChanges.subscribe(newPassword => {
      this.formControls.passwordConfirmation.reset();
    });

  }

  ngOnInit() {

    this.route.data.pipe(take(1)).subscribe(({ resetPasswordRequestParams }) => {
      const { oneTimeUseAuthToken, login, error } = resetPasswordRequestParams;

      const isErrantResetRequest = !!error;

      if (isErrantResetRequest) {
        this.error = error;
      } else {
        this.oneTimeUseAuthToken = oneTimeUseAuthToken;
        this.userLogin = login;
      }
    });
  }

  onSubmit() {
    const resetPasswordForm = this.resetPasswordForm.value;

    this.resetPasswordService.completeResetPassword(this.userLogin, resetPasswordForm.password, this.oneTimeUseAuthToken).subscribe(
      result => {
        if (result === true) {
          this.onSuccess();
        } else {
          this.onFailed();
        }
      }
    );
  }

  onStrengthChanged(strength) {
    this._validPassword.next((strength >= 80) ? true : false);
  }

  onSuccess() {
    this.notification.success('Password changed');
    this.router.navigateByUrl('/public/login');
  }


  onFailed() {
    this.notification.error('Failed to reset password');
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}

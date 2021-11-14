import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { ResetPasswordService } from '../reset-password.service';
import { delay } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/components/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bds-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  resetForm = this.fb.group({
    // email: EmailComponent.buildForm(this.fb),
    login: [''],
  });

  get f() { return this.resetForm.controls; }

  constructor(private fb: FormBuilder, private resetPassword: ResetPasswordService, private notification: MessageService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.resetPassword.requestResetPassword(this.resetForm.value).pipe(
      delay(500)
    ).subscribe(
      resetPasswordResult => {

        if (resetPasswordResult === true) {
          this.notification.success(`Reset password link sent to ${this.resetForm.value}`);
          this.router.navigateByUrl("/");
        } else {
          this.notification.error(`Failed to send reset password link for ${this.resetForm.value}`);
        }
      },
      error => {
        this.notification.error(`Failed to send reset password link for ${this.resetForm.value}`);

      });
  }
}

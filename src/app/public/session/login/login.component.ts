import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { EmailComponent } from 'src/app/shared/components/email/email.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    // email: EmailComponent.buildForm(this.fb),
    login: [''],
    password: ['', Validators.required],
    tenantCode: [null], //HACK!!! WE NEED A WORKFLOW CHANGE TO ACCOMODATE
  });

  get f() { return this.loginForm.controls; }

  apiMessage$ = this.loginService.apiMessage$;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.loginForm.get('email').valueChanges
    // .pipe(tap(e => this.loginForm.get('login').setValue(e)))
    // .subscribe();
  }

  onSubmit() {
    this.loginService.execute(this.loginForm.value);
  }
}

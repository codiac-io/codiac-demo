import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/state/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AppConfigQuery } from 'src/app/shared/state/app-config';
import { HttpHeaders } from '@angular/common/http';

import * as jwt from 'jwt-decode'



interface ChangePasswordRequest {
  login: string;
  newPassword: string;
  oldPassword?: string;
}

interface ResetPasswordRequest {
  userLogin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  api = ""
  apiMessageBsubj: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userWithoutTenant: User;
  userPropertiesCaptured: any;
  profiles: any;

  public get apiMessage$(): Observable<string> {
    return this.apiMessageBsubj.asObservable();
  }

  constructor(
    protected apiSvc: ApiService,
    private appConfigQuery: AppConfigQuery,
  ) {
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.auth;
      }))
      .subscribe()
  }

  // REQUEST password reset
  public requestResetPassword(loginId: string): Observable<boolean> {
    const requestBody: ResetPasswordRequest = { userLogin: loginId }

    // request reset > send email > load change password component
    this.apiSvc.subnav = 'password';
    return this.apiSvc.post<ResetPasswordRequest>(this.apiSvc.buildUrl(this.api), requestBody)
      .pipe(map((response) => {
        return response.success; // will either be T or F
      }));
  }

  // FULFILL password reset
  public completeResetPassword(loginId: string, newPassword: string, oneTimeUseAuthToken: string) {
    // form and issue a PUT to endpoint with ChangeRequestPassword payload
    const changePasswordRequest: ChangePasswordRequest = {
      login: loginId,
      newPassword
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: oneTimeUseAuthToken
      })
    }

    this.apiSvc.subnav = 'password';
    return this.apiSvc.put<ChangePasswordRequest>(
      this.apiSvc.buildUrl(this.api), changePasswordRequest, null, httpOptions
    )
      .pipe(map((response) => {
        return response.success;
      }));
  }


  public changePassword(loginId: string, newPassword: string, oldPassword?: string): Observable<boolean> {
    // "ChangePasswordRequest": {
    //   "type": "object",
    //   "properties": {
    //       "login": {
    //           "type": "string"
    //       },
    //       "newPassword": {
    //           "type": "string"
    //       },
    //       "oldPassword": {
    //           "type": "string"
    //       }
    //   },
    //   "required": [
    //       "login",
    //       "newPassword"
    //   ]


    this.apiSvc.subnav = 'password';

    let changePasswordRequest: ChangePasswordRequest = {
      login: loginId,
      newPassword
    }

    if (oldPassword) {
      changePasswordRequest = { ...changePasswordRequest, oldPassword }
    }

    return this.apiSvc.put<ChangePasswordRequest>(
      this.apiSvc.buildUrl(this.api),
      changePasswordRequest
    ).pipe(map((response) => {
      return response.success
    }));

  }

  isValidToken(token: string): boolean {
    try {
      const decoded = jwt(token);
      return true;
    } catch (error) {
      // bad token
      console.error(error);
      return false;
    }
  }

  extractUserLogin(token: string): string {
    let userLogin = '';
    if (this.isValidToken(token)) {
      const decoded = jwt(token);
      userLogin = decoded.email;
    }
    return userLogin;
  }

}

import { AuthTokenStore, authTokenStore, AuthTokenState } from './auth-token.store';
import { Injectable } from '@angular/core';
import { ApiService, HttpRequestOptions } from '../../services/api/api.service';
import { AppConfigQuery } from '../app-config';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthTokenQuery } from './auth-token.query';
import { HttpHeaders } from '@angular/common/http';
import { SessionUserService } from '../session-user';
import { resetStores } from "@datorama/akita";
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {

  api = "";

  constructor(protected authTokenStore: AuthTokenStore,
    private router: Router,
    private authQuery: AuthTokenQuery,
    private apiSvc: ApiService,
    private appConfigQuery: AppConfigQuery) {
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.auth;
      }))
      .subscribe()
  }

  public update(token: AuthTokenState) {
    this.authTokenStore.update(token);
  }

  public logout() {
    // this.authTokenStore.update({ token: undefined, portalToken: undefined })
    // this.authTokenStore.remove();
    // this.sessionUserService.logout();
    resetStores({ exclude: ["AppConfig"] });

    if (this.router.url.startsWith(`/core/`)) {
      this.router.navigateByUrl("/public/login");
    }
  }

  public tryRefresh(token?: string): Observable<boolean> {
    this.apiSvc.subnav = 'refresh';
    let headers = new HttpHeaders();
    headers.append('authorization', token || this.authQuery.getValue().token)
    let options: HttpRequestOptions = {};
    options.headers = headers;
    return this.apiSvc.post<string>(this.apiSvc.buildUrl(this.api), null, this.authTokenStore, options)
      .pipe(map((response) => {
        return response.success
      }));
  }

  public resetPassword(loginId: string): Observable<boolean> {
    this.apiSvc.subnav = 'password';
    return this.apiSvc.post<string>(this.apiSvc.buildUrl(this.api), loginId)
      .pipe(map((response) => {
        return response.success
      }));
  }
}

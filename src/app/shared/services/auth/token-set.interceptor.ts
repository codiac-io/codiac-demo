import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import {
  AuthTokenQuery,
  AuthTokenService,
  AuthTokenState
} from "../../state/auth-token";
import { tap, delay, take, map } from "rxjs/operators";
import { Router } from "@angular/router";
import * as jwt from 'jwt-decode'
import { TenantService } from '../../state/tenant/tenant.service';
import { createJwtPayload } from '../../state/auth-token/jwt-payload.model';
import { AppConfigQuery } from "../../state/app-config";

@Injectable({ providedIn: "root" })
export class TokenSetInterceptor implements HttpInterceptor {
  api = "";
  constructor(private authTokenSvc: AuthTokenService,
    private authTokenQuery: AuthTokenQuery,
    private tenantService: TenantService,
    private appConfig: AppConfigQuery
  ) {
    this.appConfig.select()
      .pipe(map(config => {
        this.api = config.api;
      }))
      .subscribe()
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse && event.url.includes(this.api)) {
            if (event && event.headers) {
              try {
                let authObj: AuthTokenState = {
                  token: event.headers.get("authorization"),
                  portalToken: event.headers.get("portal-token"),
                  jwtPayload: null,
                };

                authObj.jwtPayload = createJwtPayload(jwt(authObj.token));
                // this.tenantService.setActive(createTenant({}))
                // set it whether it's valid or not let the guard sort it out
                if (authObj.token) {
                  this.authTokenSvc.update(authObj);
                  this.tenantService.setActive(authObj.jwtPayload.tenant_code);
                  // if (authObj.jwtPayload.subx_status == "current") this.router.navigateByUrl('/public/subscription-issue');
                }
              } catch (error) { }
            }
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if ([403, 401, 422].includes(err.status)) {
              if (err.url.includes("portal-token") || (!err.url.includes("portal-token") && this.authTokenQuery.getValue().jwtPayload && this.authTokenQuery.getValue().jwtPayload.subx_enabled)) this.authTokenSvc.logout();
            }
          }
        }
      )
    );
  }
}

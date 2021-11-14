import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenQuery } from '../../state/auth-token';
import { AppConfigQuery } from '../../state/app-config';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TokenAppendInterceptor implements HttpInterceptor {
  api = "";
  constructor(private authTokenSvc: AuthTokenQuery,
    private appConfigQuery: AppConfigQuery) {
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.api;
      }))
      .subscribe()
  }
  // private fusebillApiKey = "MDpDRE11QTNWUDJ2UVMzMGI5c2VBb0RncmJZNHE3bXhTSHhTbUI2QjI2Tm9rS2FwVnJZdGpGbnNCem1ERzdzMXpT";


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authTokenSvc.getValue().token) {

      if (request.url.includes(this.api))
        request = request.clone({
          setHeaders: {
            Authorization: `${this.authTokenSvc.getValue().token}`
          }
        });

      // if (request.url.includes(this.environmentVariablesQuery.getValue().apiBase.fuseBillApi))
      //   request = request.clone({
      //     setHeaders: {
      //       Authorization: `Basic ${this.fusebillApiKey}`
      //     }
      //   });
    }
    return next.handle(request);
  }
}

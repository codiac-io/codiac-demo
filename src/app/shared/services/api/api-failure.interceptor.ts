import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiFailureService } from '../../state/api-failure';

@Injectable({ providedIn: 'root' })
export class ApiFailureInterceptor implements HttpInterceptor {
  constructor(private apiFailureService: ApiFailureService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event) => {
      if (event instanceof HttpResponse) {
        if ((event.status != undefined && ((event.status < 200) || (event.status >= 300))) || event.body == null ||
          (event.body.success != undefined && event.body.success == false && event.status != 205)) {
          let httpErr = event as unknown as HttpErrorResponse
          this.handleBadRequest(httpErr)
        }
      }
    }, (event: any) => {
      if (event instanceof HttpErrorResponse) {
        if (event.status != undefined && event.status != 200) {
          this.handleBadRequest(event);
        }
      }
    }));
  }

  private handleBadRequest(event: HttpErrorResponse) {
    this.apiFailureService.update(event);
    console.error(event);
  }
}

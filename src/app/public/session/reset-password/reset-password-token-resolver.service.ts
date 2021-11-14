import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { Observable } from 'rxjs';

export interface ResolvedResetPasswordRequest {
  oneTimeUseAuthToken: string;
  login: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordTokenResolverService implements Resolve<ResolvedResetPasswordRequest> {

  constructor(private resetPasswordService: ResetPasswordService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): ResolvedResetPasswordRequest | Observable<ResolvedResetPasswordRequest> | Promise<ResolvedResetPasswordRequest>
    {
      const resolveResult: ResolvedResetPasswordRequest = {
        oneTimeUseAuthToken: '',
        login: ''
      };

      const token = this.collectToken(route);
      if (this.resetPasswordService.isValidToken(token)) {
        resolveResult.oneTimeUseAuthToken = token;
        resolveResult.login = this.resetPasswordService.extractUserLogin(token);
      } else {
        resolveResult.error ='Invalid password reset token provided';
      }

      return resolveResult;
    }

    private collectToken(route: ActivatedRouteSnapshot): string {
      return route.paramMap.get('token');
    }

}

import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	CanActivateChild,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	NavigationCancel,
	Route,
	Router,
	UrlSegment
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthorizationService } from '../auth/authorization.service';
import { AppConfigQuery } from '../../state/app-config/app-config.query';
// import { AuthorizationService } from '../auth/authorization.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivateChild, CanLoad, CanActivate {
	constructor(private authService: AuthorizationService, private router: Router, private environmentVariablesQuery: AppConfigQuery) { }

	canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.isAuthorized()
			&& !state.url.startsWith(`${this.environmentVariablesQuery.getValue().domain}/public/`)) {
			this.router.navigateByUrl('/public/login');
			return false;
		}

		return this.authService.isAuthorized();
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.validate();
	}

	canActivate() {
		return this.validate();
	}

	validate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.isAuthorized()) this.router.navigateByUrl('/public/login');
		return this.authService.isAuthorized();
	}
}

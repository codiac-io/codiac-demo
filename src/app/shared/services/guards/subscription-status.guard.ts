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
import { TenantQuery } from '../../state/tenant/tenant.query';
import { distinctUntilChanged } from 'rxjs/operators';
import { AppConfigQuery } from '../../state/app-config';
// import { AuthorizationService } from '../auth/authorization.service';
import { AuthTokenQuery } from '../../state/auth-token/auth-token.query';

@Injectable({
	providedIn: 'root'
})
export class SubscriptionStatusGuard implements CanActivateChild, CanLoad, CanActivate {
	constructor(private authTokenQuery: AuthTokenQuery, private router: Router, private environmentVariablesQuery: AppConfigQuery) { }

	canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.isValid()
			&& !state.url.startsWith(`${this.environmentVariablesQuery.getValue().domain}/public/`)) {
			this.router.navigateByUrl('/public/subscription-issue');
			return false;
		}

		return this.isValid();
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.isValid();
	}

	canActivate() {
		return this.isValid();
	}

	isValid(): Observable<boolean> | Promise<boolean> | boolean {
		return (this.authTokenQuery.getValue().jwtPayload && this.authTokenQuery.getValue().jwtPayload.subx_status !== "current");
	}
}

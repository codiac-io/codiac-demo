import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	Route,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild,
	CanLoad
} from '@angular/router';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Role } from '../../enum/role';

function arrayOf<T = string>(input: T | null): T[] {
	if (!input) { return []; }
	return input instanceof Array ? input : [input];
}

@Injectable({
	providedIn: 'root'
})
export class AuthorizedUserGuard implements CanActivate, CanActivateChild, CanLoad {
	constructor(private router: Router, private authService: AuthService) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.canNavigate(next.routeConfig)
			.pipe(tap(canLoad => this.redirectToMain(canLoad)));
	}

	canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
		return this.canNavigate(route)
			.pipe(tap(canLoad => this.redirectToMain(canLoad)));
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canNavigate(childRoute.routeConfig)
			.pipe(tap(canLoad => this.redirectToMain(canLoad)));
	}

	canNavigate(route: Route): Observable<boolean> {
		if (!route || !route.data) { return of(true); }
		const rolesList = arrayOf<Role>(route.data.roles);
		return this.authService.isInRole(...rolesList);
	}

	private redirectToMain(canNavigate: boolean) {
		if (!canNavigate) {
			this.router.navigateByUrl('/');
		}
	}
}

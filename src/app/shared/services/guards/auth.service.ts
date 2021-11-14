import { HttpRequest } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/state/user';
import { Role } from '../../enum/role';

export abstract class AuthService {
	abstract getUser(): Observable<User>;
	abstract wrapRequest<T = any>(request: HttpRequest<T>): Observable<HttpRequest<T>>;
	abstract login(): Observable<boolean>;
	abstract logout();

	abstract getRoles(): Observable<Role[]>;

	abstract isAuthenticated(): Observable<boolean>;

	isInRole(...roles: Role[]): Observable<boolean> {
		return this.isAuthenticated()
			.pipe(
				switchMap(isAuthenticated => {
					if (!isAuthenticated) { return of(false); }
					if (!roles || !roles.length) { return of(true); }

					return this.getRoles()
						.pipe(map(existing => _.some(roles, r => _.includes(existing, r))));
				}),
				catchError(err => of(false))
			);
	}
}

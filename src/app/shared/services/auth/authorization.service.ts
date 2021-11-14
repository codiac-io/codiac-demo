import { Injectable, Inject } from '@angular/core';
import { AuthTokenQuery } from '../../state/auth-token';
// import { HttpClient } from '@angular/common/http';

// import { of, Observable, from, throwError } from 'rxjs';
// import { map, switchMap, catchError, tap } from 'rxjs/operators';
// import { OAuthService } from 'angular-oauth2-oidc';

// import { AUTH_CONFIG, AuthConfig, AUTH_STORAGE } from '../config';

// import * as models from '../models';
// import { UrbanAirOAuthService } from './oauth.service';
// import * as responses from '@urban-air/common/responses';
// import { AuthHeaders } from './headers';

@Injectable()
export class AuthorizationService {
// 	private discoveryDocument: any;
// 	private loadingDiscoveryDocument: Promise<any>;
// 	private cachedUser: models.User;
// 	private cachedToken: string;

	constructor(
		private authTokenSvc: AuthTokenQuery
// 		private http: HttpClient,
// 		@Inject(AUTH_CONFIG) private authConfig: AuthConfig,
// 		@Inject(AUTH_STORAGE) private authStorage: Storage,
// 		private oauthService: UrbanAirOAuthService
) {

// 		this.initializeOAuth(this.authConfig);
// 		oauthService.setStorage(authStorage);
	}

// 	private async initializeOAuth(config: AuthConfig) {
// 		this.oauthService.configure({
// 			clientId: config.clientId,
// 			dummyClientSecret: config.clientSecret,
// 			issuer: config.baseUrl,
// 			scope: (config.scopes || [])
// 				.concat(['offline_access', 'openid', 'profile', 'accounts', 'payments'])
// 				.join(' '),
// 			oidc: false
// 		});

// 		this.loadingDiscoveryDocument = this.oauthService.loadDiscoveryDocument();
// 		this.discoveryDocument = await this.loadingDiscoveryDocument;
// 		this.loadingDiscoveryDocument = Promise.resolve(this.discoveryDocument);
// 	}

// 	loadUser(): Observable<models.User | null> {
// 		return from(this.loadingDiscoveryDocument)
// 			.pipe(
// 				switchMap(() => from(this.oauthService.loadUserProfile())),
// 				map((user: models.TokenSuccess) => this.convertToUser(user))
// 			);
// 	}

// 	authorizeUser(username: string, password: string): Observable<models.User> {
// 		return from(this.loadingDiscoveryDocument)
// 			.pipe(
// 				switchMap(() => from(this.oauthService.fetchTokenUsingPasswordFlow(username, password))),
// 				switchMap(() => this.loadUser()),
// 				tap(user => {
// 					this.cachedUser = user;
// 					this.cachedToken = this.oauthService.getAccessToken();
// 				}),
// 				catchError((error: { error: models.TokenError }) => {
// 					return throwError({
// 						...error,
// 						error: {
// 							message: error.error.error_description,
// 							validations: []
// 						}
// 					});
// 				})
// 			);
// 	}

// 	impersonateUser(token: string): Observable<models.User> {
// 		return from(this.loadingDiscoveryDocument)
// 			.pipe(
// 				switchMap(() => from(this.oauthService.fetchTokenUsingImpersonationToken(token))),
// 				switchMap(() => this.loadUser()),
// 				tap(user => {
// 					this.cachedUser = user;
// 					this.cachedToken = this.oauthService.getAccessToken();
// 				}),
// 				catchError((error: { error: models.TokenError }) => {
// 					return throwError(this.convertToFailure(error.error));
// 				})
// 			);
// 	}

// 	private convertToFailure(error: models.TokenError): responses.Failure {
// 		return {
// 			failureType: responses.FailureType.General,
// 			failureCode: error.error,
// 			message: error.error_description
// 		};
// 	}

// 	updateUsername(user: models.User, newUsername: string, password: string): Observable<models.User> {
// 		return this.http.put<responses.Success<models.User>>(`${this.authConfig.baseUrl}/user-service/users/update-username`, {
// 			personId: user.personId,
// 			oldUsername: user.username,
// 			password,
// 			newUsername,
// 		}, {
// 				headers: {
// 					[AuthHeaders.Authorization]: `Bearer ${this.oauthService.getAccessToken()}`,
// 					[AuthHeaders.AuthenticatedWith]: this.authConfig.authenticateWith
// 				}
// 			})
// 			.pipe(map(result => result.data));
// 	}

// 	getUser(): Observable<models.User> {
// 		if (this.cachedToken === this.oauthService.getAccessToken()) {
// 			return of(this.cachedUser);
// 		} else {
// 			this.cachedToken = this.oauthService.getAccessToken();
// 			return this.loadUser()
// 				.pipe(tap(user => this.cachedUser = user));
// 		}
// 	}

	isAuthorized(): boolean {
		// Currently we simply assume that if the token exsits then you shall pass, and the next api call will kick you out
		// TODO: need to look into validating that the existing token is still good against the server
        return (this.authTokenSvc.getValue().token)? true : false;
	}

// 	logout() {
// 		this.oauthService.logOut();
// 	}

// 	private convertToUser(input: models.TokenSuccess): models.User {
// 		return {
// 			username: input.sub,
// 			accountId: input.account_id,
// 			firstName: input.first_name,
// 			lastName: input.last_name,
// 			personId: input.person_id
// 		};
// 	}
}

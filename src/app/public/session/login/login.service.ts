import { Injectable } from '@angular/core';
import { createUser, User } from 'src/app/shared/state/user';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/state/ui/loading';
import { map } from 'rxjs/operators';
import { Success } from 'src/app/shared/services/responses';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUserService } from '../../../shared/state/session-user/session-user.service';
import { TenantQuery } from '../../../shared/state/tenant/tenant.query';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiMessageBsubj: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userWithoutTenant: User;
  userPropertiesCaptured: any;
  profiles: any;

  public get apiMessage$(): Observable<string> {
    return this.apiMessageBsubj.asObservable();
  }

  constructor(
    private sessionUserService: SessionUserService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  execute(credentials: any) {
    this.loadingService.setLoading(this.constructor.name);
    this.apiMessageBsubj.next(null);
    const user = createUser(credentials);

    this.sessionUserService.login(user)
      .pipe(map((response: Success<User>) => {
        if (response && response.success) {
          // clear memory of credentials
          this.userWithoutTenant = null;
          this.userPropertiesCaptured = null;
          this.profiles = null;
          const user = <User>response.output;
          // user.id = '0';
          this.sessionUserService.setSessionUser(user);
          this.goToDashboard();
        } else {

          const extractTenantProfiles = (response: Success<User>) => {
            return response.output.profiles;
          };

          const extractUserProperties = (response: Success<User>) => {
            return response.output;
          };

          // seach for multitenant response
          if (this.isMultiTenantResponse(response)) {
            // stash credentials and Tenant options
            this.userWithoutTenant = user;
            this.userPropertiesCaptured = extractUserProperties(response);
            this.profiles = extractTenantProfiles(response);
            this.router.navigateByUrl('/public/login/select-tenant');
          }

          this.apiMessageBsubj.next((response && response.message) ? response.message : "Invalid email or password.");
        }
        this.loadingService.clearAll();
      }))
      .subscribe(
        null, // success path
        response => { // error path
          console.log(response.statusText);
          this.apiMessageBsubj.next(response.error.message);
          this.loadingService.clearAll();
        }
      );
  }

  private goToDashboard() {
    this.router.navigateByUrl('/core')
  }

  private isMultiTenantResponse(response: Success<User> & { scenarioId?: string }): boolean {
    let result = false;
    // is multitenant response
    if (response && response.output.profiles && response.output.profiles.length > 1) {
      result = true;
    }
    return result;
  }
}

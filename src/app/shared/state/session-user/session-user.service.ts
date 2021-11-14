import { ID, IDS } from '@datorama/akita';
import { SessionUserStore, sessionUserStore } from './session-user.store';
import { Injectable } from '@angular/core';
import { SessionUser } from '.';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { AppConfigQuery } from '../app-config';
import { Success } from '../../services/responses';
import { map } from 'rxjs/operators';

interface LoginUser {
  email: string,
  password: string
}

@Injectable({ providedIn: 'root' })
export class SessionUserService {

  api = "";

  constructor(private sessionUserStore: SessionUserStore,
    protected apiSvc: ApiService,
    private appConfigQuery: AppConfigQuery) {
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.auth;
      }))
      .subscribe()
  }

  public logout() {
    // this.sessionUserStore.removeActive(0);
    this.sessionUserStore.remove();
  }


  public registerTenant(user: SessionUser): Observable<any> {
    this.apiSvc.subnav = 'tenants'
    return this.apiSvc.post<SessionUser, SessionUser>(this.apiSvc.buildUrl(this.api), user);
  }

  // We don't set storage b/c the user that comes back gets stored by the interceptor.
  public login(user: LoginUser): Observable<Success<SessionUser>> {
    this.apiSvc.subnav = 'login';
    return this.apiSvc.post<SessionUser>(this.apiSvc.buildUrl(this.api), user)
      .pipe(map((response) => {
        // this.update(response.output, true);
        return response;
      }));
  }

  public setSessionUser(active: SessionUser) {
    this.sessionUserStore.upsert(active.id, active);
    this.sessionUserStore.setActive(active.id);
  }
}

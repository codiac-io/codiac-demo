import { ID, IDS } from '@datorama/akita';
import { UserStore } from './user.store';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { ApiService, HttpRequestOptions } from '../../services/api/api.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Success } from '../../services/responses';
import { AppConfigQuery } from '../app-config/app-config.query';
import { AuthTokenQuery } from '../auth-token';
import { Access } from '../../enum/access';
import { Role } from '@codiac.io/codiac-domain';


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private store: UserStore,
    private authTokenQuery: AuthTokenQuery,
    protected apiSvc: ApiService,
    private appConfigQuery: AppConfigQuery) {
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.api;
      }))
      .subscribe()
  }

  api = "";


  add(user: User): Observable<Success<User>> {
    user.login = user.email; // These must be in parody or Auth will fail
    user.password = Math.random().toString(36).substr(2, 8);
    this.apiSvc.subnav = 'Users/new'
    return this.apiSvc.post<User>(this.apiSvc.buildUrl(this.api), user, this.store)
  }

  update(user: User, storeOnly?: boolean): Observable<Success<User>> {
    user.login = user.email; // These must be in parody or Auth will fail
    if (storeOnly && storeOnly == true) this.store.upsert(user.id, user);
    else {
      this.apiSvc.subnav = `Users/${user.id}`
      return this.apiSvc.put<User>(this.apiSvc.buildUrl(this.api), user, this.store);
    }
  }

  delete(body: User): Observable<Success<User>> {
    this.apiSvc.subnav = 'Users/' + body.id;
    return this.apiSvc.delete<User>(this.apiSvc.buildUrl(this.api), this.store, null);
  }

  // public removeActiveUser() {
  //   this.store.remove(); // this.store.remove(0) doesnt seem to work
  // }

  public remove(ids?: IDS) {
    this.store.remove(ids)
  }

  public access(): Access {
    // HACK: this logic will not stand the test of time
    if (this.authTokenQuery.getValue().jwtPayload.roles.indexOf(Role.Admin) != -1) {
      return Access.READWRITE;
    }
    else
      return Access.READ;
  }

}

// export const userService = new UserService(userStore);

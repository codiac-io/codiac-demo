import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { UserState, UserStore } from './user.store';
import { User } from './user.model';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState, User> {

  private queryEntitySvc: QueryEntityService<UserState, User> = new QueryEntityService(this.apiSvc, this.store, 'Users');

  constructor(protected apiSvc: ApiService, protected userStore: UserStore) {
    super(userStore);
  }

  public selectAllWithApi(): Observable<User[]> {
    return this.queryEntitySvc.selectAllWithApi();
  }

  public selectUserByLogin(login): Observable<User> {
    return this.selectEntity(item => item.login == login);
  }

  public error$ = this.selectError().pipe(filter(value => !(value == null || value === undefined))).subscribe(err => { console.log(`${this.constructor.name}: error with ${JSON.stringify(err, undefined, 2)}`) });
}
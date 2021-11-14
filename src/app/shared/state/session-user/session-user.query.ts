import { QueryEntity } from '@datorama/akita';
import { SessionUserStore, SessionUserState, sessionUserStore } from './session-user.store';
import { SessionUser } from './session-user.model';
import { Injectable } from '@angular/core';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';

@Injectable({ providedIn: 'root' })
export class SessionUserQuery extends QueryEntity<SessionUserState, SessionUser> {

  constructor(protected apiSvc: ApiService, protected store: SessionUserStore) {
    super(store);
  }
}

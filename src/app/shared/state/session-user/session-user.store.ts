import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SessionUser } from './session-user.model';
import { Injectable } from '@angular/core';

export interface SessionUserState extends EntityState<SessionUser> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'SessionUser' })
export class SessionUserStore extends EntityStore<SessionUserState, SessionUser> {

  constructor() {
    super();
  }

}

export const sessionUserStore = new SessionUserStore();


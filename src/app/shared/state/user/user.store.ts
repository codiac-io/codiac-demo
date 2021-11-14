import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { User } from './user.model';
import { Injectable } from '@angular/core';

export interface UserState extends EntityState<User>, ActiveState  {}

const initialState = {
  active: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'User' })
export class UserStore extends EntityStore<UserState, User> {

  constructor() {
    super(initialState);
  }

}

export const userStore = new UserStore();


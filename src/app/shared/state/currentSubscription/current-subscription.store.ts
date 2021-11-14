import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CurrentSubscription } from './current-subscription.model';
import { Injectable } from '@angular/core';

export interface CurrentSubscriptionState extends EntityState<CurrentSubscription> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'CurrentSubscription' })
export class CurrentSubscriptionStore extends EntityStore<CurrentSubscriptionState, CurrentSubscription> {

  constructor() {
    super();
  }

}

export const currentSubscriptionStore = new CurrentSubscriptionStore();


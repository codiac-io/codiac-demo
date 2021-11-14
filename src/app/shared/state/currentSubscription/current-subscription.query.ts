import { QueryEntity } from '@datorama/akita';
import { CurrentSubscriptionStore, CurrentSubscriptionState, currentSubscriptionStore } from './current-subscription.store';
import { CurrentSubscription } from './current-subscription.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CurrentSubscriptionQuery extends QueryEntity<CurrentSubscriptionState, CurrentSubscription> {

  constructor(protected store: CurrentSubscriptionStore) {
    super(store);
  }

}

export const currentSubscriptionQuery = new CurrentSubscriptionQuery(currentSubscriptionStore);

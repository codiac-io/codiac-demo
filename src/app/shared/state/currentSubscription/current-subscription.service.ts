import { ID } from '@datorama/akita';
import { CurrentSubscriptionStore, currentSubscriptionStore } from './current-subscription.store';
import { CurrentSubscription } from './current-subscription.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../../services/responses';


@Injectable({ providedIn: 'root' })
export class CurrentSubscriptionService {

  constructor(private currentSubscriptionStore: CurrentSubscriptionStore) {
  }

  public upsertStore(currentSubscription: CurrentSubscription) {
    this.currentSubscriptionStore.upsert(currentSubscription.id, currentSubscription);
  }
}

export const currentSubscriptionService = new CurrentSubscriptionService(currentSubscriptionStore);
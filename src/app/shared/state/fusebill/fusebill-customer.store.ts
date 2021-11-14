import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FusebillCustomer } from './fusebill-customer.model';
import { Injectable } from '@angular/core';

export interface FusebillState extends EntityState<FusebillCustomer> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'FusebillCustomer' })
export class FusebillCustomerStore extends EntityStore<FusebillState, FusebillCustomer> {

  constructor() {
    super();
  }

}

export const fusebillStore = new FusebillCustomerStore();


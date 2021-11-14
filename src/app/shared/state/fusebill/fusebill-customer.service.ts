import { ID } from '@datorama/akita';
import { FusebillCustomerStore } from './fusebill-customer.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FusebillService {

  constructor(private fusebillStore: FusebillCustomerStore) {
  }

}

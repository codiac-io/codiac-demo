import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Enterprise } from './enterprise.model';

export interface EnterpriseState extends EntityState<Enterprise>, ActiveState { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'Enterprise'
})
export class EnterpriseStore extends EntityStore<EnterpriseState, Enterprise> {

  constructor() {
    super();
  }

}

import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Environment } from './environment.model';

export interface EnvironmentState extends EntityState<Environment>, ActiveState { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'Environment'
})
export class EnvironmentStore extends EntityStore<EnvironmentState, Environment> {

  constructor() {
    super();
  }

}

import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Cabinet } from './cabinet.model';

export interface CabinetState extends EntityState<Cabinet>, ActiveState { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'Cabinet'
})
export class CabinetStore extends EntityStore<CabinetState, Cabinet> {

  constructor() {
    super();
  }

}

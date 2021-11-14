import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ConfigState } from './config-state.model';

export interface ConfigStateState extends EntityState<ConfigState> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ConfigState' })
export class ConfigStateStore extends EntityStore<ConfigStateState, ConfigState> {

  constructor() {
    super();
  }

}

export const configStateStore = new ConfigStateStore();
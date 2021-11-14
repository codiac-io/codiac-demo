import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ConfigStateStore, configStateStore } from './config-state.store';


@Injectable({ providedIn: 'root' })
export class ConfigStateService {

  constructor(private configStateStore: ConfigStateStore) {
  }

}

export const configStateService = new ConfigStateService(configStateStore);
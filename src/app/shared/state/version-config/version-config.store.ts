import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { VersionConfig } from './version-config.model';

export interface VersionConfigState extends EntityState<VersionConfig> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'VersionConfig'
})
export class VersionConfigStore extends EntityStore<VersionConfigState, VersionConfig> {

  constructor() {
    super();
  }

}

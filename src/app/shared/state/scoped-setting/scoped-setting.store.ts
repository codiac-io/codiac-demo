import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ScopedSetting } from './scoped-setting.model';

export interface ScopedSettingState extends EntityState<ScopedSetting> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'ScopedSetting'
})
export class ScopedSettingStore extends EntityStore<ScopedSettingState, ScopedSetting> {

  constructor() {
    super();
  }
}
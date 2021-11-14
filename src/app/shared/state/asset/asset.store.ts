import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Asset } from './asset.model';

export interface AssetState extends EntityState<Asset> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'Asset'
})
export class AssetStore extends EntityStore<AssetState, Asset> {

  constructor() {
    super();
  }
}

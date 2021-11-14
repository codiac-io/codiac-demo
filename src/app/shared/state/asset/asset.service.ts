import { Injectable } from '@angular/core';
import { Asset } from './asset.model';
import { ApiService } from '../../services/api/api.service';
import { AssetStore } from './asset.store';
import { Success } from '../../services/responses';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssetService {
  constructor(
    protected apiSvc: ApiService,
    private assetStore: AssetStore,
  ) {
  }

  add(body: Asset): Observable<Success<Asset>> {
    this.apiSvc.subnav = 'assets/new'
    return this.apiSvc.post<Asset>(this.apiSvc.buildUrl(), body, this.assetStore);
  }

  update(asset: Asset): Observable<Success<Asset>> {
    this.apiSvc.subnav = `assets/${asset.id}`
    return this.apiSvc.put<Asset>(this.apiSvc.buildUrl(), asset, this.assetStore);
  }

  upsertMany(assets: Asset[]) {
    this.assetStore.upsertMany(assets)
  }
}
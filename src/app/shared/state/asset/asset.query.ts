import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { Asset } from './asset.model';
import { AssetStore, AssetState } from './asset.store';

@Injectable({ providedIn: 'root' })
export class AssetQuery extends QueryEntity<AssetState, Asset> {

  private queryEntitySvc: QueryEntityService<AssetState, Asset> = new QueryEntityService(this.apiSvc, this.store, 'assets');

  constructor(protected apiSvc: ApiService, protected assetStore: AssetStore) {
    super(assetStore);
  }

  public selectAllWithApi(): Observable<Asset[]> {
    return this.queryEntitySvc.selectAllWithApi();
  }

  public selectCabinetById(id): Observable<Asset> {
    return this.selectEntity(item => item.id == id);
  }
}
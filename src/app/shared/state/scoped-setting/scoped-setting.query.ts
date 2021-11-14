import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ScopedSetting } from './scoped-setting.model';
import { ScopedSettingStore, ScopedSettingState } from './scoped-setting.store';

@Injectable({ providedIn: 'root' })
export class ScopedSettingQuery extends QueryEntity<ScopedSettingState, ScopedSetting> {

  private queryEntitySvc: QueryEntityService<ScopedSettingState, ScopedSetting> = new QueryEntityService(this.apiSvc, this.store, 'settings');

  constructor(protected apiSvc: ApiService, protected assetStore: ScopedSettingStore) {
    super(assetStore);
  }

  public selectAllWithApi(): Observable<ScopedSetting[]> {
    return this.queryEntitySvc.selectAllWithApi();
  }

  public selectCabinetById(id): Observable<ScopedSetting> {
    return this.selectEntity(item => item.id == id);
  }
}
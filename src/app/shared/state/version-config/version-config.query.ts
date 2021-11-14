import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';
import { VersionConfigState } from './version-config.store';
import { VersionConfig } from './version-config.model';
import { Observable } from 'rxjs';
import { VersionConfigStore } from "./version-config.store"

@Injectable({ providedIn: 'root' })
export class VersionConfigQuery extends QueryEntity<VersionConfigState, VersionConfig> {

  private queryEntitySvc: QueryEntityService<VersionConfigState, VersionConfig> = new QueryEntityService(this.apiSvc, this.store, 'VersionConfigs');

  constructor(protected apiSvc: ApiService, protected VersionConfigStore: VersionConfigStore) {
    super(VersionConfigStore);
  }

  public selectAllWithApi(): Observable<VersionConfig[]> {
    return this.queryEntitySvc.selectAllWithApi();
  }

  public selectVersionConfigById(id): Observable<VersionConfig> {
    return this.selectEntity(item => item.id == id);
  }
}

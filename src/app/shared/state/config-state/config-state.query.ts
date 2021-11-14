import { QueryEntity } from '@datorama/akita';
import { ConfigStateStore, ConfigStateState, configStateStore } from './config-state.store';
import { ConfigState } from './config-state.model';
import { Injectable } from '@angular/core';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';
import { Observable, timer } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ConfigStateQuery extends QueryEntity<ConfigStateState, ConfigState> {

  private queryEntitySvc: QueryEntityService<ConfigStateState, ConfigState> = new QueryEntityService(this.apiSvc, this.store, 'ConfigState');

  constructor(protected apiSvc: ApiService, protected configStateStore: ConfigStateStore) {
    super(configStateStore);
  }

  public selectWithApi(enterprise: string, cabinet: string): Observable<ConfigState[]> {
    const subNav = `enterprise/${enterprise}/cabinet/${cabinet}/config-state`;
    return this.queryEntitySvc.selectWithApi(subNav);
  }

}
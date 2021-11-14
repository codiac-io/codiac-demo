import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EnvironmentStore, EnvironmentState } from './environment.store';
import { Environment } from './environment.model';
import { Observable } from 'rxjs';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';

@Injectable({ providedIn: 'root' })
export class EnvironmentQuery extends QueryEntity<EnvironmentState, Environment> {

  private queryEntitySvc: QueryEntityService<EnvironmentState, Environment> = new QueryEntityService(this.apiSvc, this.store, 'environments');

  constructor(protected apiSvc: ApiService, protected environmentStore: EnvironmentStore) {
    super(environmentStore);
  }

  public selectEnvironmentById(id): Observable<Environment> {
    return this.selectEntity(item => item.id == id);
  }
}

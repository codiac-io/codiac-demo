import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EnterpriseStore, EnterpriseState } from './enterprise.store';
import { Enterprise } from './enterprise.model';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';
import { Observable, interval, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EnterpriseQuery extends QueryEntity<EnterpriseState, Enterprise> {

  private queryEntitySvc: QueryEntityService<EnterpriseState, Enterprise> = new QueryEntityService(this.apiSvc, this.store, 'enterprises');

  constructor(protected apiSvc: ApiService, protected enterpriseStore: EnterpriseStore) {
    super(enterpriseStore);
  }

  public selectAllWithApi(): Observable<Enterprise[]> {
    return this.queryEntitySvc.selectAllWithApi();
  }

  //HACK: NEEDS TO GET FROM APIs TOO AND WATCHABLE
  public selectEnterpriseById(id): Observable<Enterprise> {
    return this.selectEntity(item => item.id == id);
  }
}

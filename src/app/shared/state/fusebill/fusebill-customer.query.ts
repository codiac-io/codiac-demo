import { QueryEntity } from '@datorama/akita';
import { FusebillCustomerStore, FusebillState, fusebillStore } from './fusebill-customer.store';
import { FusebillCustomer } from '.';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';
import { AppConfigQuery } from '../app-config/app-config.query';

@Injectable({ providedIn: 'root' })
export class FusebillCustomerQuery extends QueryEntity<FusebillState, FusebillCustomer> {

  public subnav = 'Customers/';
  private queryEntitySvc: QueryEntityService<FusebillState, FusebillCustomer> = new QueryEntityService(this.apiSvc, this.store, this.subnav, this.environmentVariablesQuery.getValue().fuseBillApi);

  constructor(protected apiSvc: ApiService, protected store: FusebillCustomerStore, protected environmentVariablesQuery: AppConfigQuery) {
    super(store);
  }

  public selectWithApi(): Observable<FusebillCustomer[]> {
    return this.queryEntitySvc.selectWithApi();
  }
}
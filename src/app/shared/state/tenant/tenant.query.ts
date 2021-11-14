import { QueryEntity } from '@datorama/akita';
import { TenantStore, TenantState, tenantStore } from './tenant.store';
import { Tenant } from './tenant.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { ApiService } from '../../services/api/api.service';
import { HttpParams } from '@angular/common/http';
import { SessionUserQuery } from '../session-user/session-user.query';
import { map } from 'rxjs/operators';
import { buildUrl } from '../../services/utilities/build-urls';
import * as XLSX from 'xlsx';

@Injectable({ providedIn: 'root' })
export class TenantQuery extends QueryEntity<TenantState, Tenant> {

  constructor(protected apiSvc: ApiService, private sessionUserQuery: SessionUserQuery, protected store: TenantStore) {
    super(store);
  }

  private queryEntitySvc: QueryEntityService<TenantState, Tenant> = new QueryEntityService(this.apiSvc, this.store, 'tenants');

  public selectAllWithApi(): Observable<Tenant[]> {
    return this.queryEntitySvc.selectAllWithApi();
  }

  /**
   * inGoodStanding
   */
  public get inGoodStanding(): Observable<boolean> {
    return this.selectFirst().pipe(map(tenant => {
      if (tenant) {
        const subscription = tenant.subscriptions.find(item => item.tenantId == tenant.id);
        return (subscription && subscription.status !== "current") ? false : true;
      }
      else return false;
    }))
  }

  public getTenantForCurrentUser(): Observable<Tenant> {
    this.apiSvc.subnav = "Tenants";
    const requestOptions = {
      params: new HttpParams().set('code', this.sessionUserQuery.getAll()[0].tenantCode)
    };

    return this.apiSvc.get<Tenant>(this.apiSvc.buildUrl(), this.store, requestOptions)
      .pipe(map(response => {
        this.store.upsertMany(response.output);
        return response.output[0];
      }));
  }
}
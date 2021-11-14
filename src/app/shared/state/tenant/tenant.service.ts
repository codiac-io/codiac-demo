import { ID } from '@datorama/akita';
import { TenantStore, tenantStore } from './tenant.store';
import { Tenant } from '.';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Success } from '../../services/responses';
import { TenantQuery } from './tenant.query';
import { delay, filter, flatMap, map, retryWhen, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SessionUser } from '../session-user';
import { AuthTokenQuery } from '../auth-token';
import { AppConfigQuery } from '../app-config';

@Injectable({ providedIn: 'root' })
export class TenantService {

  api = "";
  constructor(protected apiSvc: ApiService,
    private tenantStore: TenantStore,
    private tenantQuery: TenantQuery,
    private appConfig: AppConfigQuery,
    private authTokenQuery: AuthTokenQuery) {
    this.appConfig.selectConfigs()
      .pipe(map(config => {
        this.api = config.auth;
      }))
      .subscribe()
  }

  public registerTenant(user: SessionUser): Observable<any> {
    this.apiSvc.subnav = 'tenants'
    return this.apiSvc.post<Tenant>(this.apiSvc.buildUrl(this.api), user, this.tenantStore);
  }

  update(tenant: Tenant): Observable<Success<Tenant>> {
    this.apiSvc.subnav = `Tenants/${tenant.id}`
    return this.apiSvc.put<Tenant>(this.apiSvc.buildUrl(), tenant, this.tenantStore);
  }

  setActive(tenantCode: string): Observable<Success<Tenant>> {
    try {
      if (this.tenantQuery && this.tenantQuery.getAll()) {
        const activeTenant = this.tenantQuery.getAll().find(item => item.code == tenantCode);
        if (activeTenant) {
          this.tenantStore.setActive(activeTenant.id);
          return of(<Success<Tenant>>{ success: true, output: activeTenant, message: `${activeTenant.code} active` })
        }
      }
    } catch (error) {
      console.log("Tenant.service setActive: ", error);
    }
  }

  syncBilling(): Observable<any> {
    this.apiSvc.subnav = 'fusebill/sync'
    return this.apiSvc.post<any>(this.apiSvc.buildUrl(), {}, undefined, {}, false);
  }



  public meterSync(takeUntil$: Subject<unknown>) {
    let syncTryCount = 0
    let syncTrys$: BehaviorSubject<number> = new BehaviorSubject(0);
    return this.syncBilling()
      // .pipe(flatMap(() => this.authTokenService.tryRefresh()))
      .pipe(flatMap(() => this.authTokenQuery.select()))
      .pipe(tap(() => {
        syncTryCount = syncTryCount++; //HACK, shouldnt need this Rx increment and count
        syncTrys$.next(syncTryCount)
      }))
      .pipe(delay(5000))
      .pipe(filter(store => { return (!store.jwtPayload.subx_enabled) ? true : false }))
      .pipe(switchMap(() => this.meterSync(takeUntil$))) //This keeps us from tossing a bunch of syncs that have not finished their request. one after another this way.
      .pipe(takeUntil(takeUntil$))
      .subscribe();
  }

  delete(body: Tenant): Observable<Success<Tenant>> {
    this.apiSvc.subnav = 'Tenants/' + body.id;
    return this.apiSvc.delete<Tenant>(this.apiSvc.buildUrl(), this.tenantStore, null);
  }


  public savePaymentMethod(paymentInfo): Observable<any> {
    this.apiSvc.subnav = 'paymentsv2'
    return this.apiSvc.post(this.apiSvc.buildUrl(this.appConfig.getValue().fuseBillApi), paymentInfo);
  }
}

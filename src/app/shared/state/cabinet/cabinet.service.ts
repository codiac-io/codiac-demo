
import { Injectable } from '@angular/core';
import { ApiService, HttpRequestOptions } from '../../services/api/api.service';
import { Observable, of } from 'rxjs';
import { Success } from '../../services/responses';
import { Cabinet } from './cabinet.model';
import { CabinetStore } from './cabinet.store'
import * as relay from '@codiac.io/codiac-relay-contracts';
import { AuthTokenQuery } from '../auth-token';
import { AppConfigQuery } from '../app-config';
import { SessionUser, SessionUserQuery } from '../session-user';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CabinetScope, AssetVersion } from "@codiac.io/codiac-relay-contracts"
import { Result } from '@codiac.io/codiac-common/contracts';

@Injectable({ providedIn: 'root' })
export class CabinetService {
  constructor(
    private appConfigQuery: AppConfigQuery,
    protected apiSvc: ApiService,
    private cabinetStore: CabinetStore,
    private authTokenQuery: AuthTokenQuery,
    private sessionUseQuery: SessionUserQuery
  ) {
  }

  add(body: Cabinet): Observable<Success<Cabinet>> {
    this.apiSvc.subnav = 'Cabinets/new'
    return this.apiSvc.post<Cabinet>(this.apiSvc.buildUrl(), body, this.cabinetStore);
  }

  update(Cabinet: Cabinet): Observable<Success<Cabinet>> {
    this.apiSvc.subnav = `Cabinets/${Cabinet.id}`
    return this.apiSvc.put<Cabinet>(this.apiSvc.buildUrl(), Cabinet, this.cabinetStore);
  }

  upsertMany(cabinets: Cabinet[]) {
    if (cabinets && cabinets.length > 0)
      this.cabinetStore.upsertMany(cabinets)
  }

  public cabinetCreate(targetCabinet: relay.CabinetScope): Observable<Success<relay.ExecuteCabinetMakerResponse>> {
    this.cabinetStore.setLoading(true)
    const userContext = new relay.UserContext((this.sessionUseQuery.getActive() as SessionUser).login, targetCabinet.enterprise, this.authTokenQuery.JWT);
    const baseUrl = this.appConfigQuery.getValue().relayBaseUrl
    this.apiSvc.subnav = `execute-cabinet-maker`;
    let headers: HttpHeaders = new HttpHeaders({ authorization: this.authTokenQuery.JWT })
    let httpRequestOptions: HttpRequestOptions = { headers: headers };

    const execCreateCabReq: relay.ExecuteCreateCabinetRequest = new relay.ExecuteCreateCabinetRequest({ targetCabinet: targetCabinet, userContext: userContext });
    return this.apiSvc.post<relay.ExecuteCabinetMakerResponse>(this.apiSvc.buildUrl(baseUrl), execCreateCabReq, undefined, httpRequestOptions)
      .pipe(tap(() => { this.cabinetStore.setLoading(false) }));
  }

  public serviceDeploy(cabCntx: CabinetScope, assets: AssetVersion[]): Observable<Success<Result>> {
    this.cabinetStore.setLoading(true)
    const userContext = new relay.UserContext((this.sessionUseQuery.getActive() as SessionUser).login, cabCntx.enterprise, this.authTokenQuery.JWT);
    const baseUrl = this.appConfigQuery.getValue().relayBaseUrl
    this.apiSvc.subnav = `execute-deployment`;
    let headers: HttpHeaders = new HttpHeaders({ authorization: this.authTokenQuery.JWT })
    let httpRequestOptions: HttpRequestOptions = { headers: headers };

    const execCreateCabReq: relay.ExecuteDeploymentServiceRequest = new relay.ExecuteDeploymentServiceRequest({ target: cabCntx, assets: assets, userContext: userContext });
    return this.apiSvc.post<any>(this.apiSvc.buildUrl(baseUrl), execCreateCabReq, undefined, httpRequestOptions)
      .pipe(tap(() => { this.cabinetStore.setLoading(false) }));
  }

  public cabinetDelete(target: CabinetScope): Observable<Success<relay.ExecuteCabinetMakerResponse>> {
    this.cabinetStore.setLoading(true)
    const userContext = new relay.UserContext((this.sessionUseQuery.getActive() as SessionUser).login, target.enterprise, this.authTokenQuery.JWT);
    const baseUrl = this.appConfigQuery.getValue().relayBaseUrl
    this.apiSvc.subnav = `execute-cabinet-killer`;
    let headers: HttpHeaders = new HttpHeaders({ authorization: this.authTokenQuery.JWT })
    let httpRequestOptions: HttpRequestOptions = { headers: headers };

    const execCreateCabReq: relay.ExecuteCabinetKillerRequest = new relay.ExecuteCabinetKillerRequest({ target: target, userContext: userContext });
    return this.apiSvc.post<any>(this.apiSvc.buildUrl(baseUrl), execCreateCabReq, undefined, httpRequestOptions)
      .pipe(tap(() => { this.cabinetStore.setLoading(false) }));
  }

}

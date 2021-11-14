import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { VersionConfig } from '@codiac.io/codiac-domain';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';
import { Success } from '../../services/responses';
import { VersionConfigStore } from "./version-config.store"

@Injectable({ providedIn: 'root' })
export class VersionConfigService {
  constructor(protected apiSvc: ApiService, private VersionConfigStore: VersionConfigStore) {
  }

  add(body: VersionConfig): Observable<Success<VersionConfig>> {
    this.apiSvc.subnav = 'VersionConfigs/new'
    return this.apiSvc.post<VersionConfig>(this.apiSvc.buildUrl(), body, this.VersionConfigStore);
  }

  update(VersionConfig: VersionConfig): Observable<Success<VersionConfig>> {
    this.apiSvc.subnav = `VersionConfigs/${VersionConfig.id}`
    return this.apiSvc.put<VersionConfig>(this.apiSvc.buildUrl(), VersionConfig, this.VersionConfigStore);
  }

  delete(body: VersionConfig): Observable<Success<VersionConfig>> {
    this.apiSvc.subnav = 'VersionConfigs/' + body.id;
    return this.apiSvc.delete<VersionConfig>(this.apiSvc.buildUrl(), this.VersionConfigStore, null);
  }
}
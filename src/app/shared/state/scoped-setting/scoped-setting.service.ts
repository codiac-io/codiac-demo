import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import { Success } from '../../services/responses';
import { ScopedSetting } from './scoped-setting.model';
import { ScopedSettingStore } from './scoped-setting.store';

@Injectable({ providedIn: 'root' })
export class ScopedSettingService {

  constructor(
    protected apiSvc: ApiService,
    private scopedSettingStore: ScopedSettingStore
  ) {
  }

  add(body: ScopedSetting): Observable<Success<ScopedSetting>> {
    this.apiSvc.subnav = 'settings/new'
    return this.apiSvc.post<ScopedSetting>(this.apiSvc.buildUrl(), body, this.scopedSettingStore);
  }

  update(setting: ScopedSetting): Observable<Success<ScopedSetting>> {
    this.apiSvc.subnav = `settings/${setting.id}`
    return this.apiSvc.put<ScopedSetting>(this.apiSvc.buildUrl(), setting, this.scopedSettingStore);
  }

  upsertMany(assets: ScopedSetting[]) {
    this.scopedSettingStore.upsertMany(assets)
  }

  delete(body: ScopedSetting): Observable<Success<ScopedSetting>> {
    this.apiSvc.subnav = 'settings/' + body.id;
    return this.apiSvc.delete<ScopedSetting>(this.apiSvc.buildUrl(), this.scopedSettingStore);
  }
}
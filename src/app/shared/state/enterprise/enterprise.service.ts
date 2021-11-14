
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Observable, of } from 'rxjs';
import { Success } from '../../services/responses';
import { EnterpriseStore } from "./enterprise.store"
import { Enterprise } from './enterprise.model';

@Injectable({ providedIn: 'root' })
export class EnterpriseService {
  constructor(protected apiSvc: ApiService, private EnterpriseStore: EnterpriseStore) {
  }

  add(body: Enterprise): Observable<Success<Enterprise>> {
    this.apiSvc.subnav = 'Enterprises/new'
    return this.apiSvc.post<Enterprise>(this.apiSvc.buildUrl(), body, this.EnterpriseStore);
  }

  update(Enterprise: Enterprise): Observable<Success<Enterprise>> {
    this.apiSvc.subnav = `Enterprises/${Enterprise.id}`
    return this.apiSvc.put<Enterprise>(this.apiSvc.buildUrl(), Enterprise, this.EnterpriseStore);
  }

  delete(body: Enterprise): Observable<Success<Enterprise>> {
    this.apiSvc.subnav = 'Enterprises/' + body.id;
    return this.apiSvc.delete<Enterprise>(this.apiSvc.buildUrl(), this.EnterpriseStore, null);
  }

  setActive(enterprise: Enterprise){
    this.EnterpriseStore.setActive(enterprise.id);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Observable, of } from 'rxjs';
import { Success } from '../../services/responses';
import { Environment } from './environment.model';
import { EnvironmentState, EnvironmentStore } from './environment.store'
import { EnvironmentQuery } from '.';
import { QueryEntityService } from '../../services/data/query-entity.service';
import { take, tap } from 'rxjs/operators';
import { CabinetService } from '../cabinet';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  constructor(protected apiSvc: ApiService,
    protected environmentStore: EnvironmentStore,
    private cabinetService: CabinetService) {
  }

  private queryEntitySvc: QueryEntityService<EnvironmentState, Environment> = new QueryEntityService(this.apiSvc, this.environmentStore, 'environments');

  public getAll(): Observable<Environment[]> {
    const get$ = this.queryEntitySvc.selectAllWithApi().pipe(tap(envs => {
      let totalCabs = []
      envs.forEach((env) => {
        totalCabs = totalCabs.concat(env.cabinets);
      });

      this.cabinetService.upsertMany(totalCabs)
    }))
      .pipe(take(1));

    get$.subscribe();

    return get$;
  }

  add(env: Environment): Observable<Success<Environment>> {
    this.apiSvc.subnav = 'Environments/new'
    return this.apiSvc.post<Environment>(this.apiSvc.buildUrl(), env, this.environmentStore);
  }

  update(env: Environment): Observable<Success<Environment>> {
    this.apiSvc.subnav = `Environments/${env.id}`
    return this.apiSvc.put<Environment>(this.apiSvc.buildUrl(), env, this.environmentStore);
  }

  delete(env: Environment): Observable<Success<Environment>> {
    this.apiSvc.subnav = 'Environments/' + env.id;
    return this.apiSvc.delete<Environment>(this.apiSvc.buildUrl(), this.environmentStore, null);
  }

  setActive(id: string) {
    this.environmentStore.setActive(id)
  }
}

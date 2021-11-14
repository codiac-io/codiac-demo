import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CabinetStore, CabinetState } from './cabinet.store';
import { Cabinet } from '.';
import { ApiService } from '../../services/api/api.service';
import { Observable, timer } from 'rxjs';
import { QueryEntityService } from '../../services/data/query-entity.service';


@Injectable({ providedIn: 'root' })
export class CabinetQuery extends QueryEntity<CabinetState, Cabinet> {

  private queryEntitySvc: QueryEntityService<CabinetState, Cabinet> = new QueryEntityService(this.apiSvc, this.store, 'cabinets');

  constructor(protected apiSvc: ApiService, protected CabinetStore: CabinetStore) {
    super(CabinetStore);
  }

  public selectAllWithApi(watch: number = -1): Observable<Cabinet[]> {
    // HACK: quick timer for demo
    if (watch > 0) {
      const watcher$ = timer(0, watch)
      watcher$.subscribe(() => {
        this.queryEntitySvc.selectAllWithApi();
      });
      return this.queryEntitySvc.selectAllWithApi();
    }
    else
      return this.queryEntitySvc.selectAllWithApi();
  }

  public selectCabinetById(id): Observable<Cabinet> {
    return this.selectEntity(item => item.id == id);
  }
}
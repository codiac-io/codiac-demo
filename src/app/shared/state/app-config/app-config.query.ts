import { Query } from '@datorama/akita';
import { AppConfigStore, environmentVariablesStore } from './app-confiig.store';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AppConfig } from './app-config.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppConfigQuery extends Query<AppConfig> {

  constructor(protected store: AppConfigStore) {
    super(store);
  }

  public selectConfigs(): Observable<AppConfig> {
    return this.select().pipe(filter(config => (config) ? true : false))
  }

  public error$ = this.selectError().pipe(filter(value => !(value == null || value === undefined))).subscribe(err => { console.log(`${this.constructor.name}: error with ${JSON.stringify(err, undefined, 2)}`) });
}

export const environmentVariablesQuery = new AppConfigQuery(environmentVariablesStore);

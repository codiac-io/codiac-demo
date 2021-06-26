import { buildUrl, PrimitiveType } from '../utilities/build-urls';
import { Injectable } from '@angular/core';
import { AppConfigQuery } from '../../state/app-config/app-config.query';
import { map } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
export abstract class ApiServiceBase {
  subnav = '';
  serviceName = '';
  api = "";

  constructor(protected appConfigQuery: AppConfigQuery) {
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.api;
      }))
      .subscribe()
  }

  buildUrl(baseUrl = this.api, ...args: PrimitiveType[]): string {
    return buildUrl(baseUrl, this.subnav, ...args);
  }
}

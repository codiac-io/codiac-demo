import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad
} from '@angular/router';
import { of, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppConfigService } from '../../state/app-config';

function arrayOf<T = string>(input: T | null): T[] {
  if (!input) { return []; }
  return input instanceof Array ? input : [input];
}

@Injectable({
  providedIn: 'root'
})
export class LoadConfigGuard implements CanActivateChild, CanActivate, CanLoad {
  constructor(
    private configSvc: AppConfigService,
  ) { }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.validate();
  }

  canActivate() {
    return this.validate();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.validate();
  }

  validate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.configSvc.getAppConfig().pipe(map(response => {
      if (response.isStaticConfig) this.configSvc.getAppConfig();
      return !response.isStaticConfig;
    }));
  }
}

import { ID } from '@datorama/akita';
import { AppConfigStore, environmentVariablesStore } from './app-confiig.store';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Observable, of } from 'rxjs';
import { AppConfig, createAppConfig } from './app-config.model';
import { delay, map, mergeMap, repeat, retry, share } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import * as appConfig from "../../../../app-config.json"
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  isBrowser: boolean;

  constructor(
    protected apiSvc: ApiService,
    private environmentVariablesStore: AppConfigStore,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.getAppConfig()
  }


  getAppConfig(): Observable<AppConfig> {
    console.log("isBrowser: ", this.isBrowser);

    if (this.isBrowser) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Content-Type': 'application/json'
        })
      }

      let getConfig = of({})
        .pipe(
          mergeMap(_ => this.apiSvc.get(location.origin + "/app-config.json", undefined, httpOptions)),
          delay(1000),
          repeat(),
          retry(1000))
        .pipe(map((response: any) => {
          let configMappings = createAppConfig(response);
          configMappings.isStaticConfig = false;

          this.environmentVariablesStore.update(state => {
            return configMappings
          });
          return configMappings as AppConfig;
        }))
        .pipe(share());

      getConfig.subscribe();
      return getConfig;
    }
    else
      return of(createAppConfig(appConfig));
  }
}

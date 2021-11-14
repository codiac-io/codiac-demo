import { Query } from '@datorama/akita';
import { AuthTokenStore, AuthTokenState, authTokenStore } from './auth-token.store';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { filter, map, switchMap, distinctUntilChanged, concatMap, take } from 'rxjs/operators';
import { Success } from '../../services/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigQuery } from '../app-config/app-config.query';

@Injectable({ providedIn: 'root' })
export class AuthTokenQuery extends Query<AuthTokenState> {

  constructor(protected store: AuthTokenStore,
    private http: HttpClient,
    private appConfigQuery: AppConfigQuery) {
    super(store);
    this.appConfigQuery.select()
      .pipe(map(config => {
        this.api = config.api;
      }))
      .subscribe()
  }

  api = "";

  public get JWT(): string {
    return this.store._value().token;
  }

  public get portalToken(): Observable<String> {
    return this.select("portalToken").pipe(filter(val => {
      console.log(val);
      return (val) ? true : false
    }))
      .pipe(distinctUntilChanged());
  }

  public getPortalToken(): Observable<String> {

    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': this.getValue().token
    //   }),
    //   observe: 'response'
    // };

    const waitForAuthToken = this.select("token")
      .pipe(filter(response => (response && response.length > 0) ? true : false))
      .pipe(take(1))
      .pipe(switchMap(token => {
        // get protal token after a valid auth token returns
        return this.http
          .get<any>(`${this.api}/fusebill/portal-token`, {
            observe: 'response',
            headers: new HttpHeaders({
              'Authorization': token
            })
          })
      }))
      .pipe(map(response => {
        console.log('latest token: ', response.headers.get('portal-token'))
        return response.headers.get('portal-token');
      }));;

    return waitForAuthToken

    // this.apiSvc.subnav = "fusebill/portal-token";
    // const get$ = this.apiSvc.get<String>(this.apiSvc.buildUrl(), this.store)
    //   .pipe(map(response => {
    //     return response.headers.get('portal-token');
    //   }));

    // return get$;

    // this.apiSvc.subnav = "fusebill/portal-token";
    // const get$ = this.apiSvc.get<String>(this.apiSvc.buildUrl(), this.store)
    //   .pipe(switchMap(() => this.select("portalToken").pipe(filter(val => (val) ? true : false)).pipe(distinctUntilChanged())));
    // get$.subscribe();

    // return get$;
  }
}

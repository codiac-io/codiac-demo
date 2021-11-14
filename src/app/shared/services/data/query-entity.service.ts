import { QueryEntity, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter, catchError, switchMap } from 'rxjs/operators';
import { BidStatus } from '../../enum/bid-status';
import { ApiService } from '../../services/api/api.service';
import { HttpParams } from '@angular/common/http';
import { QueryOperation } from '../../enum/query-operation';

export class QueryEntityService<S, T> extends QueryEntity<S, T> {

    constructor(protected apiSvc: ApiService, protected store: EntityStore<S, T>, subNav: string, baseUrl?: string) {
        super(store);
        this.baseUrl = baseUrl;
        this.subNav = subNav;
    }

    public baseUrl: string;
    public subNav: string;

    selectAllWithApi(subNav?: string): Observable<T[]> {
        this.apiSvc.subnav = (subNav) ? subNav : this.subNav;
        this.apiSvc.baseUrl = this.baseUrl;

        const requestOptions = {
            params: new HttpParams().set('all', 'true')
        };
        this.apiSvc.get<T>(this.apiSvc.buildUrl((this.baseUrl) ? this.baseUrl : undefined), this.store, requestOptions);
        return this.selectAll().pipe(catchError(err => {
            // We're having trouble with akita not having an initiallized obj array.  But it's only periodic and speratic, possibily a race condition with the api trying to update
            // so for now we catch and retry the api first instead, then output the selectAll()
            console.log("selectAllWithApi  failed:", JSON.stringify(err, null, 2));
            return this.apiSvc.get<T>(this.apiSvc.buildUrl((this.baseUrl) ? this.baseUrl : undefined), this.store, requestOptions).pipe(switchMap(() => this.selectAll()))
        }));
    }

    selectWithApi(subNav?: string): Observable<T[]> {
        this.apiSvc.subnav = (subNav) ? subNav : this.subNav;
        this.apiSvc.baseUrl = this.baseUrl;

        // const requestOptions = {
        //     params: new HttpParams().set('all', 'true')
        // };
        this.apiSvc.get<T>(this.apiSvc.buildUrl((this.baseUrl) ? this.baseUrl : undefined), this.store)
        return this.selectAll();
    }

    // so this is tough.  we basically need come up with a query structure that can handle both Akita and Mark's apis.  
    // for now we'll just return stright through and side-effect the results back into the store on the way in
    get(prop: string, operation?: QueryOperation, query?: string): Observable<T[]> {
        this.apiSvc.subnav = this.subNav
        const requestOptions = {
            params: new HttpParams().set(prop, operation + query)
        };
        return this.apiSvc.get<T>(this.apiSvc.buildUrl(), this.store, requestOptions)
            .pipe(filter(response => (response && response.output) ? true : false))
            .pipe(map(response => response.output));
    }
}
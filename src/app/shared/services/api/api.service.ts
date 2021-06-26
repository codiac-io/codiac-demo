import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, take, tap, catchError, share } from 'rxjs/operators';
import * as responses from '../responses';
import { ApiServiceBase } from './api-service-base';
import { EntityStore, EntityState, ID } from '@datorama/akita';
import { AppConfigQuery } from '../../state/app-config';

export interface HttpRequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  body?: any;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService extends ApiServiceBase {
  public baseUrl = 'bonk!';
  public subnav = 'bonk!';

  constructor(public http: HttpClient, protected appConfigQuery: AppConfigQuery) {
    super(appConfigQuery)
  }

  getFile(path: string): Observable<Blob> {
    return this.http.get(path, { responseType: 'blob' });
  }

  get<T = any>(path: string, store?: EntityStore<EntityState<T>, T>, options?: HttpRequestOptions): Observable<responses.Success<T[]>> {
    let hit = this.wrapRequest(this.http.get<responses.SuccessMany<T>>(path, options)).pipe(share()).pipe(tap(r => {
      if (store && r && r.output) {
        const results = (r.output instanceof Array) ? r.output : [r.output]
        if (results && results.length > 0 && !results[0]["id"])
          results.forEach(item => {
            // @ts-ignore
            item.id = Date.now().toString();
          })
        if (options && options.params) {
          // @ts-ignore
          const params: [] = options.params.keys()
          if (params.find(x => x == "all")) store.set(r.output);
        }
        else if (results) store.upsertMany(results);
      }
      return r;
    }));
    hit.pipe(take(1)).subscribe();
    return hit;
  }

  // getPagedData<T = any>(path: string, options?: HttpRequestOptions): Observable<responses.PagedResult<T>> {
  // 	return this.http.get<responses.PagedResult<T>>(path, options);
  // }

  // makeRequest<TData, TResponse>(endPoint: IEndpoint<TData, TResponse>, data: TData): Promise<TResponse>{
  // 	return null as any;
  // }

  delete<T = any>(path: string, store?: EntityStore<EntityState<T>, T>, options?: HttpRequestOptions): Observable<responses.Success<T>> {
    return this.wrapRequest<T>(
      this.http.request<responses.Success<T>>('delete', path).pipe(map(r => {
        // magic string below, watchout!
        if (store && r && r.output) store.remove(r.output['id']);
        return r;
      })));
  }

  post<TResponse = any, TBody = Partial<TResponse>>(path: string, body: TBody | any, store?: EntityStore<EntityState<TResponse>, TResponse>, options?: HttpRequestOptions, registerLoading?: boolean): Observable<responses.Success<TResponse>> {
    const x = this.http.post<responses.Success<TResponse>>(path, body, options).pipe(share())
      .pipe(catchError(err => {
        throw err;
      }))
      .pipe(map(r => {
        if (store && r && r.output) store.add(r.output)
        return r;
      }));

    return x;
  }


  put<TResponse = any, TBody = TResponse>(path: string, body: TBody | any, store?: EntityStore<EntityState<TResponse>, TResponse>, options?: HttpRequestOptions): Observable<responses.Success<TResponse>> {
    return this.wrapRequest<TResponse>(
      this.http.put<responses.Success<TResponse>>(path, body, options).pipe(share()).pipe(map(r => {
        if (store && r && r.output) store.update(r.output)
        return r;
      })));
  }

  patch<TResponse = any, TBody = TResponse>(path: string, body: TBody | any, store?: EntityStore<EntityState<TResponse>, TResponse>, options?: HttpRequestOptions): Observable<responses.Success<TResponse>> {
    return this.wrapRequest<TResponse>(
      this.http.patch<responses.Success<TResponse>>(path, body, options).pipe(share()).pipe(map(r => {
        if (store && r && r.output) store.update(r.output)
        return r;
      })));
  }

  /**
   * Handles successful responses from ng http calls.
   * This only handles 200 - 299 responses or response body with a success.
   * All other responses are handled prior in the api-failure interceptor.
   * Optionally this will update the state store
   * @param request the http verb to be fired
   * @param store the entity store to which you would like to upsert/delete the returned records
   */
  protected wrapRequest<T = any, U = EntityState<T>>(request: Observable<responses.Success<T>>, store?: EntityStore<U, T>): Observable<responses.Success<T>> {
    return request
      .pipe(catchError(err => {
        throw err;
      }));
  }
}

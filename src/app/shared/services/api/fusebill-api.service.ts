import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, take, tap, catchError, share } from 'rxjs/operators';
import * as responses from '../responses';
import { ApiServiceBase } from './api-service-base';
import { EntityStore, EntityState } from '@datorama/akita';
import { LoadingService } from '../../state/ui/loading';
import { MessageService } from '../../components/message/message.service';
import { ApiService } from './api.service';
import { FusebillCustomer } from '../../state/fusebill/fusebill-customer.model';
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
export class FusebillApiService extends ApiServiceBase {

	// public subnav = 'bonk!';
	// private apiKey = "MDpDRE11QTNWUDJ2UVMzMGI5c2VBb0RncmJZNHE3bXhTSHhTbUI2QjI2Tm9rS2FwVnJZdGpGbnNCem1ERzdzMXpT";

	// constructor(private http: HttpClient, private environmentVariablesQuery: EnvironmentVariablesQuery, private loadingService: LoadingService) {
	// 	super()
	// }

	// public getCustomer(): Observable<FusebillCustomer[]> {
	// 	return this.http
	// 		.get<any>(`${this.environmentVariablesQuery.getValue().apiBase.Api}/fusebill/portal-token`, {
	// 			observe: 'response',
	// 			headers: new HttpHeaders({
	// 				'Authorization': "Basic " + this.apiKey
	// 			})
	// 		})
	// 		.pipe(map(response => {
	// 			console.log('latest token: ', response.headers.get('portal-token'))
	// 			return response.headers.get('portal-token');
	// 		}));
	// }
}

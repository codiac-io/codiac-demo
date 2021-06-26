import { Query } from '@datorama/akita';
import { ApiFailureStore, apiFailureStore } from './api-failure.store';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiFailureQuery extends Query<HttpErrorResponse> {

  constructor(protected store: ApiFailureStore) {
    super(store);
  }

}

export const apiFailureQuery = new ApiFailureQuery(apiFailureStore);
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export function createInitialState(): HttpErrorResponse {
  return {
  } as HttpErrorResponse
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ApiFailure' })
export class ApiFailureStore extends Store<HttpErrorResponse> {
  constructor() {
    super(createInitialState());
  }
}

export const apiFailureStore = new ApiFailureStore();


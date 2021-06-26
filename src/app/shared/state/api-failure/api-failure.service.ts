import { ID } from '@datorama/akita';
import { apiFailureStore, ApiFailureStore } from './api-failure.store';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiFailureService {

  constructor(private apiFailureStore: ApiFailureStore) {
  }

  public update(apiFailureState: HttpErrorResponse) {
    this.apiFailureStore.update(apiFailureState);
  }
}
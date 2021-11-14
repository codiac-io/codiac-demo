import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface LoadingState {
  loading: boolean
  active: string[]
}

export function createInitialState(): LoadingState {
  return {
    loading: false,
    active: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'loading' })
export class LoadingStore extends Store<LoadingState> {
  constructor() {
    super(createInitialState());
  }
}

export const loadingStore = new LoadingStore();


import { ID } from '@datorama/akita';
import { LoadingStore, loadingStore, LoadingState, createInitialState } from './loading.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  constructor(private loadingStore: LoadingStore) {
  }

  setLoading(id: string) {
    this.loadingStore.update(state => {
      let active: string[] = [];
      if (state && state.active) state.active.forEach(item => active.push(item));

      let updated: {
        loading: boolean
        active: string[]
      } = {
        loading: state.loading,
        active: active
      };

      updated.active.push(id);

      updated.loading = (updated.active.length > 0) ? true : false;
      return updated;
    })
  }

  removeOne() {
    this.loadingStore.update(state => {
      let active: string[] = [];
      state.active.forEach(item => active.push(item));

      let updated: {
        loading: boolean
        active: string[]
      } = {
        loading: state.loading,
        active: active
      };

      if (updated.active.length > 0) updated.active.splice(0, 1);
      updated.loading = (updated.active.length > 0) ? true : false;
      return updated;
    })
  }

  clearAll() {
    this.loadingStore.reset();
    this.loadingStore.update(state => {
      let updated: { loading: boolean, active: string[] } = { loading: false, active: [] };
      return updated;
    })
  }
}
export const loadingService = new LoadingService(loadingStore);

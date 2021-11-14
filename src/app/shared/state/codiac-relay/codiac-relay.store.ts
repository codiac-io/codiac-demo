import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface CodiacRelayState {
  ready: boolean;
}

export function createInitialState(): CodiacRelayState {
  return {
    ready: false
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'CodiacRelay' })
export class CodiacRelayStore extends Store<CodiacRelayState> {

  constructor() {
    super(createInitialState());
  }

}
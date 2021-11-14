import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodiacRelayStore, CodiacRelayState } from './codiac-relay.store';

@Injectable({ providedIn: 'root' })
export class CodiacRelayQuery extends Query<CodiacRelayState> {

  constructor(protected store: CodiacRelayStore) {
    super(store);

    this.relayReady$ = this.select()
      .pipe(map(store => { return store.ready }))
  }

  relayReady$: Observable<boolean>;
}

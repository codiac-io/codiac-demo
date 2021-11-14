import { Query } from '@datorama/akita';
import { LoadingStore, LoadingState, loadingStore } from './loading.store';
import { Injectable } from '@angular/core';
import { CountDownService } from 'src/app/shared/services/utilities/count-down.service';
import { LoadingService, loadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class LoadingQuery extends Query<LoadingState> {

  constructor(protected store: LoadingStore, private loadingService: LoadingService, private countDownService: CountDownService) {
    super(store);

    this.countDownService.timeRemaining$.subscribe({
      complete: () => this.loadingService.removeOne()
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const defaultContainerClasses = ' centralizer-card full-width session-box';

@Injectable({
  providedIn: 'root'
})
export class SessionFormatterService {
  containerClasses$ = new BehaviorSubject<string>(defaultContainerClasses);

  resetClass() {
    this.containerClasses$.next(defaultContainerClasses);
  }

  addClass(className) {
    this.containerClasses$.next(defaultContainerClasses + ' ' + className);
  }
}

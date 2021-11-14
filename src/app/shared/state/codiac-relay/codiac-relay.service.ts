import { ID } from '@datorama/akita';
import { CodiacRelayStore } from './codiac-relay.store';
import { interval, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, debounceTime, map, share, tap, throttleTime } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const DEFAULT_IMAGE_NAME: string = "codiacimages/codiac-relay";
const DEFAULT_IMAGE_TAG: string = "1.0.2";
const DEFUALT_CONTIANER_NAME: string = "codiac-relay";
const DEFAULT_HEALTH_CHECK_URL: string = "http://localhost:5799/ready-state";
const DEFAULT_RETRY_TIMOUT_IN_MINUTES: number = 1;

@Injectable({ providedIn: 'root' })
export class CodiacRelayService {

  private healthCheckUrl: string = DEFAULT_HEALTH_CHECK_URL;

  readySubj: ReplaySubject<unknown> = new ReplaySubject();
  private get ready$(): Observable<unknown> {
    return this.readySubj.asObservable().pipe(share());
  }

  private readyFailedSubj = new ReplaySubject();
  private get readyFailed$(): Observable<unknown> {
    return this.readyFailedSubj.asObservable().pipe(share());
  }

  constructor(
    private codiacRelayStore: CodiacRelayStore
  ) {

    /**
     ******************** DEPRICATED FOR WEBSOCKETS INSTEAD ********************
     */
    // // meter when healthy
    // this.ready$
    //   .pipe(debounceTime(1000))
    //   .pipe(tap(() => {
    //     this.updateStore(true);
    //   }))
    //   .pipe(catchError(err => {
    //     this.healthCheck();
    //     return of(err);
    //   }))
    //   .subscribe()

    // // meter when unhealthy
    // this.readyFailed$
    //   .pipe(tap(() => {
    //     this.updateStore(false);
    //   }))
    //   .pipe(catchError(err => {
    //     this.healthCheck();
    //     return of(err);
    //   }))
    //   .subscribe()

    // this.healthCheck();
    /**
     ******************** DEPRICATED FOR WEBSOCKETS INSTEAD ********************
     */
  }

  public updateStore(ready: boolean) {
    this.codiacRelayStore.update((state) => {
      // this.healthCheck();
      return { ready: ready };
    });
  }
  /**
  ******************** DEPRICATED FOR WEBSOCKETS INSTEAD ********************
  */

  // public healthCheck(): void {
  //   try {
  //     // console.log(`Checking ${this.containerName} health now...`);
  //     this.http.get(this.healthCheckUrl).pipe(
  //       map(response => {
  //         // console.log(`...${this.containerName} ready.`);
  //         this.readySubj.next()
  //       }))
  //       .pipe(catchError(error => {
  //         // console.log(`...${this.containerName} failed to respond`);
  //         this.readyFailedSubj.next();
  //         return of(error);
  //       }))
  //       .subscribe();
  //   } catch (error) {
  //     // console.log("Health check failed ", JSON.stringify(error, null, 2));
  //     this.readyFailedSubj.next();
  //   }
  // }

  /**
  ******************** DEPRICATED FOR WEBSOCKETS INSTEAD ********************
  */
}

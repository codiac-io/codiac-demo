import { interval, Observable, ReplaySubject, Subject } from 'rxjs';
import { concatMap, delay, filter, retry, retryWhen, share, takeUntil, tap, } from 'rxjs/operators';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { AppConfigQuery } from '../app-config';
import { CodiacRelayService } from '.';
import { CountDownService } from '../../services/utilities/count-down.service';
import { CodiacRelayQuery } from './codiac-relay.query';
import { isPlatformBrowser } from '@angular/common';

export type ReadyState = { state: string };

@Injectable({ providedIn: 'root' })
export class CodiacRelayHealthCheck {

  private isBrowser = new Subject();
  private readonly ACTION = 'ready-state';
  private serverSocketSubject: WebSocketSubject<unknown>;

  readySubj: ReplaySubject<unknown> = new ReplaySubject();
  private get ready$(): Observable<unknown> {
    return this.readySubj.asObservable().pipe(share());
  }

  // private gernadePinTimeout = interval(1050);

  constructor(
    private codiacRelayService: CodiacRelayService,
    private codiacRelayQuery: CodiacRelayQuery,
    private appConfig: AppConfigQuery,
    private countDownService: CountDownService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {

    this.isBrowser.next(isPlatformBrowser(platformId));

    /**
     * THIS IS THE ACTUAL WEBSOCKET CONNECTION AND STREAM VIA RXJS
     */
    this.makeRelayPipe();

    this.countDownService.time = 1050;
    this.countDownService.timeRemaining$.subscribe({
      complete: () => {
        /**
         * ready$ should keep us from getting here.
         * If we're here, it means we cannot connect to the relay service and we must set our store as such
         */
        this.codiacRelayService.updateStore(false);
        // console.log("KILL THE RELAY UI!");
      }
    });

    // As long as we have ready states streaming thru we reset the countdown
    this.ready$
      .pipe(tap(() => this.countDownService.toggle$.next(true)))
      .subscribe();

    // If relay is not found try to phone it every second
    this.codiacRelayQuery.select(state => state.ready)
      .pipe(tap((ready: boolean) => {
        if (!ready)
          interval(1000)
            .pipe(tap(() => {
              this.serverSocketSubject.next({ action: this.ACTION })
            }))
            .pipe(takeUntil(this.ready$))
            .subscribe();
      }))
      .subscribe()

    this.initialize();
  }

  makeRelayPipe() {
    this.serverSocketSubject = webSocket(this.appConfig.getValue().relayWebSocket);
    this.serverSocketSubject
      .pipe(share())
      .pipe(retry(), delay(1000));
  }

  initialize() {
    this.serverSocketSubject
      .subscribe(
        (response: ReadyState) => {
          if (response.state === "ready") {
            this.codiacRelayService.updateStore(true);
            this.readySubj.next();
          }
        },
        err => { // if we fail, we retry
          this.codiacRelayService.updateStore(false);
          this.makeRelayPipe()
          this.initialize();
        },
        () => this.serverSocketSubject.next({ action: this.ACTION }) // nothing is complete!
      );
    this.serverSocketSubject.next({ action: this.ACTION }); //  THIS IS YOUR INITIAL CATALYST FOR IT ALL :: default serializer is JSON.stringify
  }
}

import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { AuthTokenQuery } from '../../state/auth-token/auth-token.query';
import { tap, takeUntil, distinctUntilChanged, take, concatMap, mergeMap, withLatestFrom, flatMap, filter, switchMap, map, catchError, retry, delay } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, combineLatest, forkJoin, merge, of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FusebillCustomerQuery } from '../../state/fusebill';
import moment from 'moment';

@Component({
  selector: 'bds-subscription-mgmt',
  templateUrl: './subscription-mgmt.component.html',
  styleUrls: ['./subscription-mgmt.component.scss']
})
export class SubscriptionMgmtComponent implements AfterViewInit, OnDestroy {

  lastToken = null;
  destroy$ = new Subject();
  url$: Subject<string> = new Subject<string>();

  @Input()
  iframeStyles: string = "'width:80vw;height:80vh;'";

  @ViewChild('iframe') iframe: ElementRef;

  section: string;
  @Input()
  section$: Subject<string> = new Subject<string>();


  private _reqIsSubscription: boolean = false;
  public get reqIsSubscription(): boolean {
    return this._reqIsSubscription;
  }

  private _stillInTrialPeriod: boolean = true;
  public get stillInTrialPeriod(): boolean {
    return this._stillInTrialPeriod;
  }



  // private route: ActivatedRoute,
  constructor(private authTokenQuery: AuthTokenQuery, private renderer: Renderer2) { }

  ngAfterViewInit() {

    this.section$
      .pipe(switchMap(section => {
        return this.authTokenQuery.getPortalToken().pipe(map(token => { return { section, token } }));
      }))
      .pipe(tap(both => {
        const querySyntax = (both.section.includes("?") ? "&" : "?")

        this._reqIsSubscription = both.section.includes("Subscriptions?") ? true : false;
        const exp = this.authTokenQuery.getValue().jwtPayload.exp;
        console.log("_reqIsSubscription _stillInTrialPeriod", this._reqIsSubscription, exp)

        this._stillInTrialPeriod = (moment(exp) <= moment(Date.now())) ? true : false;

        // WATCH OUT FOR INCOGNITO MODE!!!! if you open this in there and third party is turned off. dead in the water
        this.url$.next(`<iframe #iframe
                          style=${this.iframeStyles} 
                          src="https://sandbox-bidstreakllc.mybillsystem.com/ManagedPortal/${both.section}${querySyntax}token=${both.token}"
                          frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                        </iframe>`);
      }))
      .pipe(takeUntil(this.destroy$))
      .subscribe();

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

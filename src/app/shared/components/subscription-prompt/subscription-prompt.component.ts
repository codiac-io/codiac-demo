import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthTokenQuery } from 'src/app/shared/state/auth-token';
import { filter, tap, flatMap, delay, take, skip, takeUntil, switchMap } from 'rxjs/operators';
import { AppConfigQuery } from 'src/app/shared/state/app-config';
import { of, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { TenantService } from '../../state/tenant/tenant.service';
import { AuthTokenService } from '../../state/auth-token/auth-token.service';
import { FusebillCustomerQuery } from '../../state/fusebill';
import { LoadingService } from '../../state/ui/loading';

@Component({
  selector: 'bds-subscription-prompt',
  templateUrl: './subscription-prompt.component.html',
  styleUrls: ['./subscription-prompt.component.scss']
})
export class SubscriptionPromptComponent implements OnDestroy, AfterViewInit {

  constructor(private loadingService: LoadingService, private router: Router, private fusebillCustomerQuery: FusebillCustomerQuery, private tokenService: AuthTokenService, private tenantService: TenantService, private route: ActivatedRoute, private authTokenQuery: AuthTokenQuery, private authTokenService: AuthTokenService, private environmentVariablesQuery: AppConfigQuery) { }

  @Input()
  useModal: boolean = true;
  showing: boolean = false;
  @ViewChild("slideUp")
  slideUp: ElementRef;

  private syncTryCount = 0
  private syncTrys$: BehaviorSubject<number> = new BehaviorSubject(0);
  public showAbort$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public section$ = new Subject<string>();
  private destroy$ = new Subject();
  @Output()
  public pmtAccepted$ = new Subject();


  ngAfterViewInit() {

    this.syncTrys$
      .pipe(filter(count => (this.syncTryCount >= 50)))
      .pipe(tap(() => {
        this.destroy$.next();
        this.logout();
      }))
      .subscribe();

    this.section$
      .pipe(delay(10000)) // This allows us to wait for the iframe to load before we run the juice on them
      .pipe(tap(() => {
        this.showAbort$.next(true);
        this.meterSync();
      }))
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    // we listen to token changes. remove if in good standing. show when in bad standing
    this.authTokenQuery.select()
      .pipe(tap(store => {
        if (store.jwtPayload && store.jwtPayload.subx_enabled) {
          // console.log(store.jwtPayload.subx_enabled);
          // @ts-ignore
          if (this.useModal) this.slideUp.hide();
          this.pmtAccepted$.next();
          this.loadingService.clearAll();
        }
      }))
      .pipe(filter(store => (!this.showing && store.jwtPayload && !store.jwtPayload.subx_enabled && this.router.url !== "/") ? true : false))
      .pipe(tap((store) => {
        // console.log(store.jwtPayload.subx_enabled);
        this.showing = true;
        this.section$.next("PaymentMethod");
        // @ts-ignore
        if (this.useModal) this.slideUp.show();
        this.loadingService.clearAll();
      }))
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private meterSync() {
    return this.tenantService.syncBilling()
      // .pipe(flatMap(() => this.authTokenService.tryRefresh()))
      .pipe(flatMap(() => this.authTokenQuery.select()))
      .pipe(tap(() => {
        this.syncTryCount = this.syncTryCount++; //HACK, shouldnt need this Rx increment and count
        this.syncTrys$.next(this.syncTryCount)
      }))
      .pipe(delay(5000))
      .pipe(filter(store => { return (!store.jwtPayload.subx_enabled) ? true : false }))
      .pipe(switchMap(() => this.meterSync())) //This keeps us from tossing a bunch of syncs that have not finished their request. one after another this way.
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private meterFuseBillSync() {
    this.fusebillCustomerQuery.selectWithApi()
      .pipe(delay(5000))
      .pipe(filter(fuseBillCustomer => {
        return (fuseBillCustomer[0].status !== "current") ? true : false
      }))
      .pipe(tap(() => this.meterFuseBillSync()))
      .pipe(take(2))
      .subscribe();
  }

  public logout() {
    this.tokenService.logout();
    this.router.navigateByUrl("/");
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

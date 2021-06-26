import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, Input, ViewEncapsulation, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { RootLayout } from '../root/root.component';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, Subject, iif, combineLatest, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'condensed-layout',
  templateUrl: './condensed.component.html',
  styleUrls: ['./condensed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CondensedComponent extends RootLayout implements OnDestroy {

  e: string = "prod"
  currentDate = new Date();

  // private showReportingBsub : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // public get showReporting$() : Observable<boolean> {
  //   return this.showReportingBsub.asObservable();
  // }

  private showSidebarSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public get showSideBar$(): Observable<boolean> {
    return this.showSidebarSubj.asObservable();
  }

  private _showSideBar: boolean = false;
  public get showSideBar(): boolean {
    return this._showSideBar;
  }
  destroy$ = new Subject();

  versionSubj: BehaviorSubject<string> = new BehaviorSubject<string>("0.0.0");
  public get version$(): Observable<string> {
    return this.versionSubj.asObservable();
  }

  constructor(
    router: Router
  ) {
    super(router);
    this.e = environment.envName;

  }

  ngOnInit() {

  }

  ngAfterViewInit() {


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}

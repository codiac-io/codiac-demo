import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppConfigService } from './shared/state/app-config';
import { tap, map, take, switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type AOA = any[][];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isBrowser: boolean;
  destroy$ = new Subject();

  constructor(public environmentVariablesService: AppConfigService,
    private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfigQuery } from 'src/app/shared/state/app-config';
import { AppConfig } from 'src/app/shared/state/app-config/app-config.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  config$: Observable<AppConfig>;
  constructor(private appConfigQuery: AppConfigQuery) { }

  destroy$ = new Subject();

  ngOnInit() {
    this.config$ = this.appConfigQuery.selectConfigs()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

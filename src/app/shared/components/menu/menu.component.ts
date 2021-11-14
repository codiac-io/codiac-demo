
import { Component, OnInit, Input, ViewEncapsulation, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { takeUntil, startWith, delay, tap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'pg-menu-items',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('toggleHeight', [
      state('close', style({
        height: '0',
        overflow: 'hidden',
        marginBottom: '0',
        display: 'none',

      })),
      state('open', style({
        display: 'block',
        height: '*',
        marginBottom: '10px',
        overflow: 'hidden',
      })),
      transition('close => open', animate('140ms ease-in')),
      transition('open => close', animate('140ms ease-out'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnDestroy, AfterViewInit {
  destroy$ = new Subject();
  menuItemsSubj: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  currentItem = null;
  isPerfectScrollbarDisabled = false
  public config: PerfectScrollbarConfigInterface = {};


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    // this.Items$
    //   .pipe(startWith(null), delay(0), distinctUntilChanged()) // We must delay to allow for js to finish it's paint turn, since this is async

    setTimeout(() => {
      this.togglePerfectScrollbar();
    });
  }

  @HostListener("window:resize", [])
  onResize() {
    this.togglePerfectScrollbar();
  }

  togglePerfectScrollbar() {
    this.isPerfectScrollbarDisabled = window.innerWidth < 1025
  }

  @Input()
  public menuItems$: Observable<any[]>

  toggleNavigationSub(event, item) {
    event.preventDefault();
    if (this.currentItem && this.currentItem != item) {
      this.currentItem["toggle"] = 'close';
    }
    this.currentItem = item;
    item.toggle = (item.toggle === 'close' ? 'open' : 'close');
  }
}

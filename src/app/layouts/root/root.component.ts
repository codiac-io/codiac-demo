
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, OnDestroy, ViewChild, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable, Subject, merge, combineLatest } from 'rxjs';
import { takeUntil, filter, withLatestFrom, tap } from 'rxjs/operators';
declare var pg: any;

@Component({
  selector: 'root-layout',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootLayout implements OnInit, OnDestroy {

  layoutState: string;
  extraLayoutClass: string;
  _boxed: boolean = false
  _menuPin: boolean = false;
  _enableHorizontalContainer: boolean;
  _pageContainerClass = "";
  _contentClass = "";
  _footer: boolean = true;
  _menuDrawerOpen: boolean = false;
  //Mobile
  _secondarySideBar: boolean = false;
  //Mobile
  _mobileSidebar: boolean = false;
  //Mobile
  _mobileHorizontalMenu: boolean = false;
  _pageTitle: string;
  //Sub layout - eg: email
  _layoutOption: string;
  _subscriptions: Array<Subscription> = [];
  _layout;
  destroy$ = new Subject();
  currentRouteBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get currentRoute$(): Observable<string> {
    return this.currentRouteBehaviorSubject.asObservable();
  }


  @ViewChild('root', { static: true }) root;

  @Input()
  public contentClass: string = "";

  @Input()
  public pageWrapperClass: string = "";

  @Input()
  public footer: boolean = true;

  constructor(protected router: Router) {
    if (this.layoutState) {
      pg.addClass(document.body, this.layoutState);
    }
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data) {
            //Custom Route Data here
            this._pageTitle = root.data["title"]
            this._layoutOption = root.data["layoutOption"];
            this._boxed = root.data["boxed"]
            break;
          } else {
            break;
          }
        }
        //Reset Any Extra Layouts added from content pages
        pg.removeClass(document.body, this.extraLayoutClass);
        //Close Sidebar and Horizonta Menu
        if (this._mobileSidebar) {
          this._mobileSidebar = false;
          pg.removeClass(document.body, "sidebar-open");
        }
        this._mobileHorizontalMenu = false;
        //Scoll Top
        this.scrollToTop();
      }


      // withLatest and filter keeps the chat down
      this.router.events
        .pipe(withLatestFrom(this.currentRoute$))
        .pipe(filter(([e, curr]) => { return ((e instanceof NavigationEnd) && (e as NavigationEnd).url != curr) ? true : false }))
        .pipe(tap(([e, curr]) => {
          this.currentRouteBehaviorSubject.next((e as NavigationEnd).url);
        }))
        .pipe(takeUntil(this.destroy$))
        .subscribe();

      this.currentRoute$
        .pipe(takeUntil(this.destroy$))
        .subscribe();


    });
  }

  /** @function changeLayout
  *   @description Add Document Layout Class
  */
  changeLayout(type: string) {
    this.layoutState = type;
    if (type) {
      pg.addClass(document.body, type);
    }
  }

  /** @function removeLayout
  *   @description Remove Document Layout Class
  */
  removeLayout(type: string) {
    pg.removeClass(document.body, type);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }

    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngAfterViewInit() {
  }

  /** @function scrollToTop
  *   @description Force to scroll to top of page. Used on Route
  */
  scrollToTop() {
    let top = window.pageYOffset;
    if (top == 0) {
      let scroller = document.querySelector(".page-container");
      if (scroller)
        scroller.scrollTo(0, 0);
    }
    else {
      window.scrollTo(0, 0)
    }
  }

  /** @function openQuickView
  *   @description Show Quick View Component / Right Sidebar - Service
  */
  openQuickView($e) {
    $e.preventDefault();
  }

  /** @function openSearch
  *   @description Show Quick Search Component - Service
  */
  openSearch($e) {
    $e.preventDefault();
  }

  /** @function toggleMenuPin
  *   @description Permanently Open / Close Main Sidebar
  */
  toggleMenuPin($e) {
    if (pg.isVisibleSm()) {
      this._menuPin = false;
      return;
    }
    if (this._menuPin) {
      pg.removeClass(document.body, "menu-pin");
      this._menuPin = false;
    } else {
      pg.addClass(document.body, "menu-pin");
      this._menuPin = true;
    }
  }

  /** @function toggleMenuDrawer
  *   @description Open Main Sidebar Menu Drawer - Service
  */
  toggleMenuDrawer() {
    this._menuDrawerOpen = (this._menuDrawerOpen == true ? false : true);
  }

  /** @function toggleMobileSidebar
  *   @description Open Main Sidebar on Mobile - Service
  */
  toggleMobileSidebar() {
    if (this._mobileSidebar) {
      this._mobileSidebar = false;
      pg.removeClass(document.body, "sidebar-open");
    }
    else {
      this._mobileSidebar = true;
      pg.addClass(document.body, "sidebar-open");
    }
  }

  /** @function toggleHorizontalMenuMobile
  *   @description Open Secondary Sidebar on Mobile - Service
  */
  toggleSecondarySideBar() {
    console.log("hi")
    this._secondarySideBar = (this._secondarySideBar == true ? false : true);
  }

  /** @function toggleHorizontalMenuMobile
  *   @description Call Horizontal Menu Toggle Service for mobile
  */
  toggleHorizontalMenuMobile() {
    this._mobileHorizontalMenu = (this._mobileHorizontalMenu == true ? false : true);
  }

  @HostListener("window:resize", [])
  onResize() {
    this.autoHideMenuPin();
  }

  //Utils
  autoHideMenuPin() {
    if (window.innerWidth < 1025) {
      if (pg.hasClass(document.body, "menu-pin")) {
        pg.addClass(document.body, "menu-unpinned");
        pg.removeClass(document.body, "menu-pin");
      }
    }
    else {
      if (pg.hasClass(document.body, "menu-unpinned")) {
        pg.addClass(document.body, "menu-pin");
      }
    }
  }
}

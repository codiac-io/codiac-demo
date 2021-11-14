import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionBarItem } from '@codiac.io/codiac-front-end-common/entities';
import { ActionBarItemType } from '@codiac.io/codiac-front-end-common/enums';
import { BehaviorSubject, Observable } from 'rxjs';

import { ActionBarService } from './action-bar.service';

@Component({
  selector: 'action-bar',
  styleUrls: [
    './action-bar.component.scss',
  ],
  templateUrl: './action-bar.component.html',
  providers: [ActionBarService],
  animations: [
    trigger('fadeAnimation', [
      state('false', style({
        opacity: '0',
        visibility: 'hidden',
      })),
      state('true', style({
        opacity: '1',
        visibility: 'visible'
      })),
      transition('false => true', animate('250ms ease-in')),
      transition('true => false', animate('250ms ease-out'))
    ])
  ],
})
export class ActionBarComponent implements OnInit {

  public showActionbar: boolean = true;
  // public showAlert: boolean = true;
  // public showNotes: boolean = false;
  // public showDocs: boolean = false;
  // public showAlerts: boolean = false;
  // public showHelp: boolean = false;
  // public showSearch: boolean = false;
  // public pinNotes: boolean = false;
  // public pinDocs: boolean = false;
  // public pinHelp: boolean = false;
  // public pinAlerts: boolean = false;
  // public pinSearch: boolean = false;

  affix: boolean = false;
  public primaryActionBarItems: ActionBarItem[] = [];
  public secondaryActionItems: ActionBarItem[] = [];
  public tertiaryActionItems: ActionBarItem[] = [];
  public actionItemType: typeof ActionBarItemType = ActionBarItemType;
  public actionBarSpaceLeft: number = 0;
  public currentScreenActionsItemWidth: any = null;
  public windowWidth: number = 0;

  @Input() relayReady$: Observable<boolean> = new BehaviorSubject(true);
  @Input() expandedView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() public set ActionBarItems(value: ActionBarItem[]) {
    if (value !== undefined) {
      this.primaryActionBarItems = value.filter(x => x.Type === this.actionItemType.primary);
      this.secondaryActionItems = value.filter(x => x.Type === this.actionItemType.secondary);
      this.tertiaryActionItems = value.filter(x => x.Type === this.actionItemType.tertiary);
    }
  }
  @Input() public numOfIconsShown: number = 0;
  @Input() public showMoreBtn: boolean = false;
  @Input() public overflowThreshold: number = 20;
  @Input() public context: {} = {}

  constructor(
    // private store: Store<any>,
    private actionBarService: ActionBarService,
  ) { }

  public ngOnInit() {

    /**
     * Action bar overflow functionality - starts
     */

    this.toggleShowMoreButton();

    this.windowWidth = window.innerWidth;

    this.actionBarService.screenActionsElementWidth_returned.subscribe(
      (itemWidth: any) => {
        this.currentScreenActionsItemWidth = itemWidth;
      },
    );

    this.actionBarService.actionBarResized.subscribe(
      (size: any) => {
        this.actionBarSpaceLeft = size;

        let widthLeft = this.actionBarSpaceLeft;

        if (widthLeft < 50) {
          this.windowWidth = window.innerWidth;

          // Run loop in reverse to get last element first
          for (let i = this.primaryActionBarItems.length - 1; 0 <= i; i--) {
            const actionItem = this.primaryActionBarItems[i];
            // Get the width of this action bar item
            this.actionBarService.screenActionsElementWidth_requested.next(i);
            const increment = this.currentScreenActionsItemWidth;

            actionItem.Overflowed = true;
            const val = widthLeft + increment;
            widthLeft = val;
            this.actionBarService.spaceLeftChanged.next(widthLeft);

            if (val > this.overflowThreshold) {
              this.actionBarService.spaceLeftChanged.next(widthLeft);
              break;
            }
          }
        } else {
          // Now run loop not in reverse but as normal to replace items from front to back
          for (let i = 0; i < this.primaryActionBarItems.length; i++) {
            const actionItem = this.primaryActionBarItems[i];
            // Get the width of this action bar item
            this.actionBarService.screenActionsElementWidth_requested.next(i);
            const increment = this.currentScreenActionsItemWidth;

            if (this.windowWidth < window.innerWidth && widthLeft > this.overflowThreshold) {
              if (widthLeft > increment) {
                const val = widthLeft + increment;
                widthLeft = val;
                actionItem.Overflowed = false;
              }
            }
          }

          // Set this.innerWidth to current screen size
          this.windowWidth = window.innerWidth;
        }

        widthLeft = this.actionBarSpaceLeft;
        this.toggleShowMoreButton();
      });
    /**
     * Action bar overflow functionality - ends
     */

  }

  /**
   * Display the show more button if actions have overflowed
   */
  public toggleShowMoreButton() {

    for (let i = 0; i < this.primaryActionBarItems.length; i++) {
      const item = this.primaryActionBarItems[i];
      if (item.Overflowed) {
        this.showMoreBtn = true;
        break;
      } else {
        this.showMoreBtn = false;
      }
    }
  }

  // public toggleSidebar(panelName, actionType) {
  //     // Main function to manage sidebar states, namely pinned and open/close
  //     // ActionTypes are openclose and pin. panelNames are notes, docs, help, search and alerts
  //     switch (actionType) {

  //         case "openclose": {
  //             this.openCloseSidebar(panelName);
  //             break;
  //         }

  //         case "pin": {
  //             this.pinSidebar(panelName);
  //             break;
  //         }
  //     }
  // }

  public openCloseSidebar(panelName: string) {

    switch (panelName) {

      case 'Notes': {
        // this.store.dispatch({ type: TOGGLE_NOTES });
        break;
      }

      case 'Attachments': {
        // this.store.dispatch({ type: TOGGLE_ATTACHMENTS });
        break;
      }

      case 'help': {
        // if ((this.showHelp == false) && (this.pinHelp == false)) this.resetSidebar();
        // this.showHelp = !this.showHelp;
        break;
      }

      case 'alerts': {
        // if ((this.showAlerts == false) && (this.pinAlerts == false)) this.resetSidebar();
        // this.showAlerts = !this.showAlerts;
        break;
      }

      case 'search': {
        // if ((this.showSearch == false) && (this.pinSearch == false)) this.resetSidebar();
        // this.showSearch = !this.showSearch;
        break;
      }

    }
  }

  public resetSidebar() {
    // Used when non-pinned panel is opening
    // Checks for panels that are not pinned and open and closes them
    // if (this.pinNotes == false) this.showNotes = false;
    // if (this.pinDocs == false) this.showDocs = false;
    // if (this.pinAlerts == false) this.showAlerts = false;
    // if (this.pinHelp == false) this.showHelp = false;
    // if (this.pinSearch == false) this.showSearch = false;
  }

  public pinSidebar(panelName: string) { // Toggle pin state
    switch (panelName) {

      // case "notes": {
      //     this.pinNotes = !this.pinNotes;
      //     break;
      // }

      // case "docs": {
      //     this.pinDocs = !this.pinDocs;
      //     break;
      // }

      // case "help": {
      //     this.pinHelp = !this.pinHelp;
      //     break;
      // }

      // case "alerts": {
      //     this.pinAlerts = !this.pinAlerts;
      //     break;
      // }

      // case "search": {
      //     this.pinSearch = !this.pinSearch;
      //     break;
      // }
    }
  }

  public resizePane() {
    // this.store.dispatch({ type: toggleTopNav });
    // TODO: these all need to go NGRX
    // this.showMenu = !this.showMenu;
    // this.showFooter = !this.showFooter;
    // this.showTitle = !this.showTitle;
  }

  selectItem(item: ActionBarItem) {
    if (!item.Enabled) {
      return;
    } if (item.Action === undefined || item.Action == null) {
      return;
    }
    item.Action.next((this.context) ? this.context : true);
  }

  public toggleMenu() {
    // TODO: need reducer for toggle bool instead of hardcode
    // this.store.dispatch({type: mainMenuToggleActionTypes.SET_SINGLE, payload: true});
  }


  public sticky(_affix: boolean) {
    this.affix = _affix;
  }

  mouseOver($event) {
    this.expandedView$.next(true);
  }

}

import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ActionBarService } from './action-bar.service';

// @Directive({
//   selector: '[actionbarOverflow]',
// })

export class ActionBarOverflowDirective implements OnInit {
  public element = this.elementRef.nativeElement;
  public elementWidth = 0;
  public actionElements = { children: [], clientWidth: 0 };
  public actionElementsChildren: any[] = [];
  public elementHolder = { children: [], clientWidth: this.elementWidth };
  public allChildElements: any[] = [];
  public otherChildElements: any[] = [];
  public elementResized = new Subject<number>();
  public spaceLeft = 0;

  constructor(
    private elementRef: ElementRef,
    private actionBarService: ActionBarService,
  ) { }

  ngOnInit(): void {
    this.actionElements = this.element.querySelector('div.screen-actions');
    this.actionElementsChildren = this.actionElements.children;
    this.elementHolder = this.element.querySelector('div.actionHolder');
    this.allChildElements = this.elementHolder.children;
    this.elementWidth = this.elementHolder.clientWidth;

    // Remove the actionElements item from the otherChildElements array
    for (let i = 0; i < this.allChildElements.length; i++) {
      const element = this.allChildElements[i];
      if (element !== this.actionElements) {
        this.otherChildElements.push(element);
      }
    }

    // Initiate inital space on action bar - used timeout to wait for elements to load
    // for accurate calculation
    setTimeout(() => this.getSpaceLeft(), 500);

    // Recalculate space left
    this.elementResized.subscribe(
      (val) => {
        this.elementWidth = val;
        this.getSpaceLeft();
      },
    );

    this.actionBarService.screenActionsElementWidth_requested
      .subscribe((itemIndex: any) => {
        this.actionBarService.screenActionsElementWidth_returned
          .next(this.actionElementsChildren[itemIndex].clientWidth);
      },
      );

    this.actionBarService.spaceLeftChanged
      .subscribe(value => this.spaceLeft = value);
  }

  /**
   * Returns the amount of space left between the div.screen-actions element
   * and other items in the actionbar in pixels.
   */
  getSpaceLeft(): void {
    let otherItems = 0;

    for (let i = 0; i < this.otherChildElements.length; i++) {
      const element = this.otherChildElements[i];
      otherItems += element.clientWidth;
    }

    this.spaceLeft = this.elementWidth - this.actionElements.clientWidth - otherItems;
    this.actionBarService.actionBarResized.next(this.spaceLeft);
  }

  @HostListener('window:resize') resize(eventData: Event): void {
    this.elementResized.next(this.elementHolder.clientWidth);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { ListViewContainerComponent } from '../list-view-container/list-view-container.component';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ListViewContainerComponent,
          useClass: ListViewContainerComponent
        },
        { provide: ElementRef, useClass: MockElementRef }
      ],
      declarations: [ListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

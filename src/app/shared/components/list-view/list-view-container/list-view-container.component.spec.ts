import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewContainerComponent } from './list-view-container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('ListViewContainerComponent', () => {
  let component: ListViewContainerComponent;
  let fixture: ComponentFixture<ListViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PerfectScrollbarModule],
      declarations: [ListViewContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

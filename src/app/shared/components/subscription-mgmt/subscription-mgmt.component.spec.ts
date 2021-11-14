import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMgmtComponent } from './subscription-mgmt.component';
import { SafePipe } from 'src/app/shared/pipes/safe-pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubscriptionMgmtComponent', () => {
  let component: SubscriptionMgmtComponent;
  let fixture: ComponentFixture<SubscriptionMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [SubscriptionMgmtComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMgmtComponent);
    component = fixture.componentInstance;
    component.url$ = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

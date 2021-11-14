import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfServicesComponent } from './terms-of-services.component';

describe('TermsOfServicesComponent', () => {
  let component: TermsOfServicesComponent;
  let fixture: ComponentFixture<TermsOfServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

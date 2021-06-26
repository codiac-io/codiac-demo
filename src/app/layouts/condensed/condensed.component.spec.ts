import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensedComponent } from './condensed.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthTokenQuery } from 'src/app/shared/state/auth-token';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

class MockAuthTokenQuery {
  getJWT() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODY1MjAyMzgxNjcsInVzZXJfaWQiOm51bGwsInN1YiI6ImRAZCIsImdpdmVuX25hbWUiOiJkZW5ueSIsImZhbWlseV9uYW1lIjoia3J1ZXAiLCJlbWFpbCI6ImRAZCIsInRlbmFudF9jb2RlIjoiY29kIiwicm9sZXMiOiJhZG1pbmlzdHJhdG9yIiwidGVuYW50X25hbWUiOiIifQ==.3LsDoBiqkkgk8AeU+ni2sou9IBlvAvdyDrDf3wd22Wo';
  }

  getPortalToken() {
    return new Observable();
  }

  select() {
    return new Observable();
  }
}

describe('CondensedComponent', () => {
  let component: CondensedComponent;
  let fixture: ComponentFixture<CondensedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BsDropdownModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthTokenQuery, useClass: MockAuthTokenQuery }],
      declarations: [CondensedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

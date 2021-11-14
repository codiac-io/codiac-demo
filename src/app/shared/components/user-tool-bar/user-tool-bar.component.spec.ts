import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToolBarComponent } from './user-tool-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthTokenQuery } from '../../state/auth-token';

class MockAuthTokenQuery {
  getJWT() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODY1MjAyMzgxNjcsInVzZXJfaWQiOm51bGwsInN1YiI6ImRAZCIsImdpdmVuX25hbWUiOiJkZW5ueSIsImZhbWlseV9uYW1lIjoia3J1ZXAiLCJlbWFpbCI6ImRAZCIsInRlbmFudF9jb2RlIjoiY29kIiwicm9sZXMiOiJhZG1pbmlzdHJhdG9yIiwidGVuYW50X25hbWUiOiIifQ==.3LsDoBiqkkgk8AeU+ni2sou9IBlvAvdyDrDf3wd22Wo';
  }
}

describe('UserComponent', () => {
  let component: UserToolBarComponent;
  let fixture: ComponentFixture<UserToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: AuthTokenQuery, useClass: MockAuthTokenQuery }],
      declarations: [UserToolBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

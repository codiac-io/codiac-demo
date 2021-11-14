import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Component
} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  template: `blank`
})
class BlankComponent { }

const testRoutes: Routes = [
  {
    path: 'core',
    children: [
      {
        path: 'enterprise',
        component: BlankComponent
      }
    ]
  }
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(testRoutes)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [LoginComponent, BlankComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke loginService with loginForm values when onSubmit event occurs', () => {
    spyOn(component['loginService'], 'execute');

    const testEmail = 'a@b.com';
    const testPassword = 'abc123';

    const testFormValue = {
      login: testEmail,
      password: testPassword
    };

    component.loginForm.setValue(testFormValue);

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});

    expect(component['loginService'].execute).toHaveBeenCalledWith(
      testFormValue
    );
  });

  it('should display API error messages when reported by loginService', fakeAsync(() => {
    const findErrorReport = () =>
      fixture.debugElement.query(By.css('label.error'));
    // assert that does not appear
    let errorReportEl = findErrorReport();
    console.log(errorReportEl);

    expect(errorReportEl.nativeElement.innerText).toEqual('');

    const testMessage = 'A problem occurred when logging in';

    component['loginService'].apiMessageBsubj.next(testMessage);
    tick();
    fixture.detectChanges();

    errorReportEl = findErrorReport();
    expect(errorReportEl).not.toBeNull();
    expect(errorReportEl.nativeElement.innerText).toEqual(testMessage);
  }));
});

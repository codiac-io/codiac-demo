import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserComponent } from './current-user.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray
} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { pgSelectModule } from 'src/app/shared/components/select/select.module';

describe('UserSettingsComponent', () => {
  let component: CurrentUserComponent;
  let fixture: ComponentFixture<CurrentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, pgSelectModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [CurrentUserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserComponent);
    component = fixture.componentInstance;

    const initialFormGroup = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      roles: new FormControl(null)
    });

    component.userFormGroup = initialFormGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneComponent } from './phone.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';

describe('PhoneComponent', () => {
  let component: PhoneComponent;
  let fixture: ComponentFixture<PhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PhoneMaskDirective, useClass: PhoneMaskDirective }
      ],
      declarations: [PhoneComponent, PhoneMaskDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneComponent);
    component = fixture.componentInstance;

    const testFormGroup = new FormGroup({
      phone: new FormControl('')
    });
    component.phoneForm = testFormGroup;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

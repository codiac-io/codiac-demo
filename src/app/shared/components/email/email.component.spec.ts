import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailComponent } from './email.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EmailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;

    const testFormGroup = new FormGroup({
      email: new FormControl('')
    });
    component.emailForm = testFormGroup;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

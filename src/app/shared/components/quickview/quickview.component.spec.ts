import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickviewComponent } from './quickview.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { QuickviewService } from './quickview.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { pagesToggleService } from '../../services/toggler.service';

describe('QuickviewComponent', () => {
  let component: QuickviewComponent;
  let fixture: ComponentFixture<QuickviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: QuickviewService, useClass: QuickviewService },
        { provide: pagesToggleService, useClass: pagesToggleService }
      ],
      declarations: [QuickviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

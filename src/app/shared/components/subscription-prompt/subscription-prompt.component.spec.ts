import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPromptComponent } from './subscription-prompt.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { pgCardModule } from '../card/card.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SubscriptionPromptComponent', () => {
  let component: SubscriptionPromptComponent;
  let fixture: ComponentFixture<SubscriptionPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule,
        RouterTestingModule,
        HttpClientTestingModule,
        pgCardModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SubscriptionPromptComponent],
      providers: [
        { provide: ComponentLoaderFactory, useClass: ComponentLoaderFactory },
        { provide: PositioningService, useClass: PositioningService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

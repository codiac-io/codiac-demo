import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLanding } from './session-landing.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ExportAsModule } from 'ngx-export-as';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('UserLanding', () => {
  let component: SessionLanding;
  let fixture: ComponentFixture<SessionLanding>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        ExportAsModule,
        ModalModule
      ],
      declarations: [SessionLanding],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ComponentLoaderFactory, useClass: ComponentLoaderFactory },
        { provide: PositioningService, useClass: PositioningService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantComponent } from './tenant.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('TenantComponent', () => {
  let component: TenantComponent;
  let fixture: ComponentFixture<TenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, HttpClientTestingModule],
      declarations: [TenantComponent],
      providers: [
        { provide: ComponentLoaderFactory, useClass: ComponentLoaderFactory },
        { provide: PositioningService, useClass: PositioningService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

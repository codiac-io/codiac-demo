import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { TenantSelectorComponent } from './tenant-selector.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Component
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Role } from 'src/app/shared/enum/role';

@Component({
  template: `blank`
})
class BlankComponent {}

const testRoutes: Routes = [
  {
    path: 'public',
    children: [
      {
        path: 'login',
        component: BlankComponent
      }
    ]
  }
];

describe('TenantSelectorComponent', () => {
  let component: TenantSelectorComponent;
  let fixture: ComponentFixture<TenantSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(testRoutes),
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [TenantSelectorComponent, BlankComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // set up the scenario, then do detectchanges
  describe('should re-route to login', () => {
    let router: Router;
    let location: Location;

    beforeEach(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      router.initialNavigation();
    });

    it('when no tenantCodes are provided by loginService as empty array', fakeAsync(() => {
      component['loginService'].profiles = [];
      component.user = {
        firstName: '',
        lastName: ''
      };

      expect(location.path()).toBe('');

      // act
      fixture.detectChanges();
      tick();
      expect(location.path()).toBe('/public/login');
    }));

    it('when no tenantCodes are provided by loginService as undefined', fakeAsync(() => {
      // component['loginService'].profiles = [];
      component.user = {
        firstName: '',
        lastName: ''
      };

      expect(location.path()).toBe('');

      // act
      fixture.detectChanges();
      tick();
      expect(location.path()).toBe('/public/login');
    }));
  });

  describe('should respond to tenant selection', () => {
    it('by performing a login attempt using selected value', () => {
      // spy on and ensure the loginService execute op is called on selection of a value WITH that value
      component['loginService'].userWithoutTenant = {
        firstName: 'Larry',
        lastName: 'Smith',
        password: 'pass123',
        newUser: false,
        id: '1',
        userName: 'lsmith',
        tenantCode: '',
        tenantName: '',
        profiles: [],
        roles: [],
        email: '',
        login: '',
        phone: '123 555 - 3939',
        role: Role.User,
        created: new Date(),
        createdBy: 'Karma',
        modified: new Date(),
        modifiedBy: 'Karma'
      };

      component.user = {
        firstName: 'Larry',
        lastName: 'Smith'
      };

      component['loginService'].profiles = [
        {
          tenantCode: 'tenantA',
          roles: [
            {
              name: 'administrator',
              id: null,
              sys_tenant_stamp: ''
            }
          ]
        },
        {
          tenantCode: 'tenantB',
          roles: [
            {
              name: 'administrator',
              id: null,
              sys_tenant_stamp: ''
            }
          ]
        }
      ];

      const testTenantCodeSelection = 'tenantB';

      spyOn(component['loginService'], 'execute');
      fixture.detectChanges();
      component.tenantForm.get('tenant').setValue(testTenantCodeSelection);

      expect(component['loginService'].execute).toHaveBeenCalledWith({
        ...component['loginService'].userWithoutTenant,
        tenantCode: testTenantCodeSelection
      });
    });
  });
});

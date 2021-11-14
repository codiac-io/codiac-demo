import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User, createUser } from 'src/app/shared/state/user';
import { Success } from 'src/app/shared/services/responses';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Role } from 'src/app/shared/enum/role';

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
  },
  {
    path: 'public',
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            component: BlankComponent
          },
          {
            path: 'tenant',
            component: BlankComponent
          }
        ]
      }
    ]
  },
  { path: 'nomansland', component: BlankComponent },
  {
    path: '**',
    component: BlankComponent
  }
];

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(testRoutes)
      ],
      declarations: [BlankComponent]
    })
  );

  beforeEach(() => {
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should prepare a User model shell and call sessionUserService.login with it', () => {
    spyOn(service['sessionUserService'], 'login').and.returnValue(
      new Observable()
    );
    const testCredentials = {
      email: 'lights@nightsky.com',
      password: 'password123'
    };

    const expectedUserAtSubmit = createUser({
      email: testCredentials.email,
      password: testCredentials.password
    });

    service.execute(testCredentials);

    expect(service['sessionUserService'].login).toHaveBeenCalledWith(
      expectedUserAtSubmit
    );
  });

  describe('multi-tenant response handling', () => {
    let router: Router;
    let location: Location;

    const singleTenantUser: User = {
      id: '123',
      tenantName: 'codiac',
      tenantCode: 'cod',
      firstName: 'first',
      lastName: 'last',
      email: 'a@b.net',
      userName: 'flast',
      roles: ['baker'],
      login: 'a@b.net',
      password: 'password123!',
      phone: '123 555 - 3939',
      role: Role.User,
      created: new Date(),
      createdBy: 'Karma',
      modified: new Date(),
      modifiedBy: 'Karma',
      profiles: [],
      newUser: false
    };

    beforeEach(() => {
      service = TestBed.get(LoginService);
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      // verify current location is empty
      router.initialNavigation();
    });

    it('should route directly to application entry when successfully authenticated user is only assigned to a single tenant', fakeAsync(() => {
      const successAuthSingleTenant: Success<User> = {
        success: true,
        output: singleTenantUser,
        message: 'It worked',
        error: ''
      };

      const successAuthSingleTenantLoginResponse: Observable<
        Success<User>
      > = of(successAuthSingleTenant);

      spyOn(service['sessionUserService'], 'login').and.returnValue(
        successAuthSingleTenantLoginResponse
      );

      spyOn<any>(service, 'goToDashboard');

      // act
      service.execute({});

      expect(service['goToDashboard']).toHaveBeenCalled();
    }));

    it('should report an API failure message on success is false', fakeAsync(() => {
      const testApiErrorMessage = 'The login API call failed';
      let messageReceived = false;

      const mockApiFailOnLogin: Success<User> = {
        success: false,
        message: testApiErrorMessage
      };

      const failedAuthSingleTenantLoginResponse: Observable<Success<User>> = of(
        mockApiFailOnLogin
      );

      spyOn(service['sessionUserService'], 'login').and.returnValue(
        failedAuthSingleTenantLoginResponse
      );

      // verify that the error message was published
      service.apiMessage$
        .pipe(filter((message) => message !== null))
        .subscribe((message) => {
          expect(messageReceived).toBe(false);
          expect(message).toEqual(testApiErrorMessage);
          messageReceived = true;
        });

      // login
      service.execute({});

      tick();

      expect(messageReceived).toBe(true);
    }));

    describe('on multi-tenant user response:', () => {
      const mockMultiTenantUser: User = {
        firstName: 'denny',
        lastName: 'kruep',
        email: 'd@d',
        id: null,
        login: 'd@d',
        profiles: [
          {
            tenantCode: 'cod',
            roles: [
              {
                name: 'administrator',
                id: null,
                sys_tenant_stamp: ''
              }
            ]
          },
          {
            tenantCode: 'dod',
            roles: [
              {
                name: 'administrator',
                id: null,
                sys_tenant_stamp: ''
              }
            ]
          }
        ],
        tenantName: '',
        tenantCode: '',
        userName: 'd@d',
        roles: [Role.User],
        password: '123ab',
        // descriptor: 'Test User',
        phone: '123 555 - 3939',
        role: Role.User,
        created: new Date(),
        createdBy: 'Karma',
        modified: new Date(),
        modifiedBy: 'Karma',

        newUser: false
      };

      const multiTenantResponse = {
        success: false,
        scenarioId: 'principalLoggedInWithoutTenant',
        message:
          'Welcome, undefined! You must select one of your tenant profiles to gain access.',
        input: {
          login: 'user@contractor.com',
          password: 'pass123'
        },
        output: mockMultiTenantUser
      };

      beforeEach(() => {
        const successAuthMultiTenantLoginResponse: Observable<any> = of(
          multiTenantResponse
        );

        spyOn(service['sessionUserService'], 'login').and.returnValue(
          successAuthMultiTenantLoginResponse
        );
      });

      it('should route to tenant selector when authenticated user', fakeAsync(() => {
        expect(location.path()).toBe('');

        // act
        service.execute({});

        tick();

        // assert NO route change; remain on login component
        expect(location.path()).not.toBe('/core/dashboard');
        expect(location.path()).not.toBe('');
        expect(location.path()).toBe('/public/login/select-tenant');
      }));

      it('should record the User credentials used to authenticate the User', () => {
        const testUserCredentials = {
          email: mockMultiTenantUser.email,
          password: mockMultiTenantUser.password
        };

        expect(service.userPropertiesCaptured).toBeUndefined();

        // act
        service.execute(testUserCredentials);

        expect(service.userPropertiesCaptured).not.toBeUndefined();
        expect(service.userPropertiesCaptured.email).toEqual(
          testUserCredentials.email
        );
        expect(service.userPropertiesCaptured.password).toEqual(
          testUserCredentials.password
        );
      });

      it('should populate multi-tenant User tenantCodes in profiles', () => {
        const testUserCredentials = {
          email: mockMultiTenantUser.email,
          password: mockMultiTenantUser.password
        };

        expect(service.profiles).toBeUndefined();

        // act
        service.execute(testUserCredentials);

        expect(service.profiles).not.toEqual([]);
        expect(service.profiles).toEqual(mockMultiTenantUser.profiles);
      });
    });

    describe('single tenant ser response:', () => {
      it('should clear populated credentials and tenantCode profiles whenever single user response is received', () => {
        // set up single user response
        const successAuthSingleTenant: Success<User> = {
          success: true,
          output: singleTenantUser,
          message: 'It worked',
          error: ''
        };

        const successAuthSingleTenantLoginResponse: Observable<
          Success<User>
        > = of(successAuthSingleTenant);

        spyOn(service['sessionUserService'], 'login').and.returnValue(
          successAuthSingleTenantLoginResponse
        );

        // set phony values for state
        service.profiles = ['fake', 'codes'];
        service.userPropertiesCaptured = {
          email: 'this@world.net',
          password: 'password123!'
        };
        service.userWithoutTenant = singleTenantUser;

        expect(service.profiles).not.toBeNull();
        expect(service.userPropertiesCaptured).not.toBeNull();
        expect(service.userWithoutTenant).not.toBeNull();

        // act
        service.execute({});

        expect(service.profiles).toBeNull();
        expect(service.userPropertiesCaptured).toBeNull();
        expect(service.userWithoutTenant).toBeNull();
      });
    });
  });
});

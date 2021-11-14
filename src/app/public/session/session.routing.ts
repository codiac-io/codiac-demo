import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterPageComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SessionLanding } from './session-landing/session-landing.component';
import { TenantSelectorComponent } from './tenant/tenant-selector/tenant-selector.component';
import { UserComponent } from '../../shared/components/user/user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordTokenResolverService } from './reset-password/reset-password-token-resolver.service';
import { RequestResetComponent } from './reset-password/request-reset/request-reset.component';

export const SessionRoute: Routes = [
  {
    path: '',
    component: SessionLanding,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        children: [
          {
            path: '',
            component: LoginComponent,
            data: { animation: 'Login' }
          },
          {
            path: 'select-tenant',
            component: TenantSelectorComponent,
            data: { animation: 'Tenant' }
          }
        ]
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: { animation: 'Login' }
      },
      {
        path: 'user/:id',
        component: UserComponent
      },
      {
        path: 'error/:type',
        component: ErrorComponent
      },
      {
        path: 'lock',
        component: LockscreenComponent
      },
      {
        path: 'request-reset',
        component: RequestResetComponent,
        data: { animation: 'Login' }
      },
      {
        path: 'password/:token',
        component: ResetPasswordComponent,
        resolve: {
          resetPasswordRequestParams: ResetPasswordTokenResolverService
        },
        data: { animation: 'Login' }
      }
    ]
  }
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatInputModule } from '@angular/material/input';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterPageComponent } from './register/register.component';
import { SessionRoute } from './session.routing';
import { SessionLanding } from './session-landing/session-landing.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { pgCardModule } from '../../shared/components/card/card.module';
import { SharedModule } from '../../shared/shared.module';
import { TenantSelectorComponent } from './tenant/tenant-selector/tenant-selector.component';
import { pgSelectModule } from 'src/app/shared/components/select/select.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CurrentUserComponent } from './current-user/current-user.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EqualValidator } from './register/validate-equal.directive';
import { RequestResetComponent } from './reset-password/request-reset/request-reset.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SessionRoute),
    MatPasswordStrengthModule.forRoot(),
    ModalModule.forRoot(),
    pgCardModule,
    SharedModule,
    pgSelectModule,
    PopoverModule
  ],
  declarations: [
    ErrorComponent,
    LoginComponent,
    LockscreenComponent,
    RegisterPageComponent,
    SessionLanding,
    TenantSelectorComponent,
    CurrentUserComponent,
    ResetPasswordComponent,
    EqualValidator,
    RequestResetComponent
  ],
  providers: [ApiService]
})
export class SessionModule { }

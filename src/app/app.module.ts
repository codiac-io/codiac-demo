//Angular Core
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

//Thirdparty Components / Plugins - Optional
import { NvD3Module } from 'ngx-nvd3';
import { NgxEchartsModule } from 'ngx-echarts';
// import { IsotopeModule } from 'ngx-isotope';
// import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSplitModule } from 'angular-split';

//Bootstrap Components by ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';


//Dashboards & Shared - Optional
import { AppRouting } from './app-routing.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { CondensedComponent } from './layouts/condensed/condensed.component';
import { RootLayout } from './layouts/root/root.component';
import { SharedModule } from './shared/shared.module';
import { ApiFailureInterceptor } from './shared/services/api/api-failure.interceptor';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
// import { ExportAsModule } from 'ngx-export-as';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularSvgIconModule } from 'angular-svg-icon';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


//Hammer Config Overide
//https://github.com/angular/angular/issues/10541
@Injectable()
export class AppHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}
@NgModule({
  declarations: [
    AppComponent,
    CondensedComponent,
    RootLayout
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRouting,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NvD3Module,
    NgxEchartsModule,
    BsDropdownModule.forRoot(), // This is to bring the services.  components and directives must be imported at the defining module w/o .forRoot()
    // QuillModule,
    PerfectScrollbarModule,
    // pgSwitchModule,
    // DashboardModule,
    // pgUploadModule,
    AkitaNgDevtools.forRoot(),
    SharedModule,
    ModalModule.forRoot(),
    MatPasswordStrengthModule,
    // ExportAsModule,
    PopoverModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    AngularSplitModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AppHammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiFailureInterceptor,
      multi: true
    }],
  exports: [
    CondensedComponent,
    RootLayout
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

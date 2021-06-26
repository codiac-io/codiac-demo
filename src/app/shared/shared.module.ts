import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { QuillModule } from 'ngx-quill';
//Basic Bootstrap Modules

import { BaseComponent } from './components/base/base.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ApiFailureService } from './state/api-failure';
import { MatInputModule } from '@angular/material/input';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';

const declarations = [
  BaseComponent,
  HeaderComponent,
  ContainerComponent
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PerfectScrollbarModule,
    // QuillModule,
    BsDropdownModule, // This is to bring the components and directives : services must be imported at either app.module or an async loaded module root as: .forRoot()
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    // NgxDatatableModule,
    NgxCurrencyModule,
    MatInputModule,
    MatPasswordStrengthModule.forRoot(),
    PopoverModule,
    UiSwitchModule.forRoot({
      size: 'small',
    }),
  ],
  providers: [
    ApiFailureService,
  ],
  exports: declarations
})
export class SharedModule { }

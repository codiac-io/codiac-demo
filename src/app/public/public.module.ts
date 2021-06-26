import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoute } from './public.routing';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

const components = [LandingComponent];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PublicRoute),
    SharedModule,
    ModalModule.forRoot(),
  ],
  declarations: components,
  exports: components
})
export class PublicModule { }
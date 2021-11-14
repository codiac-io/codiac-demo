import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewContainerComponent } from './list-view-container/list-view-container.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ObserversModule } from '@angular/cdk/observers';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,
    ObserversModule,
    PerfectScrollbarModule
  ],
  declarations: [ListItemComponent, ListViewContainerComponent],
  exports: [ListItemComponent, ListViewContainerComponent]
})
export class pgListViewModule { }

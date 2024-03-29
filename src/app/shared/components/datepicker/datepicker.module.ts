import { OverlayModule } from '@angular/cdk/overlay';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pgDatePickerComponent } from './datepicker.component';
import { pgRangePickerComponent } from './rangepicker.component';

import { pgTimePickerModule } from '../time-picker/timepicker.module';
import { pgUtilModule } from '../utilities/pg-util.module';
import { pgDateScroller } from './datepicker-scroller.component';
import { pgCalendarViewModule } from '../calendar-view/calendar.module';


@NgModule({
  imports     : [ CommonModule, pgTimePickerModule, pgCalendarViewModule, FormsModule, OverlayModule,pgUtilModule,ObserversModule ],
  declarations: [ pgDatePickerComponent, pgRangePickerComponent,pgDateScroller ],
  exports     : [ pgDatePickerComponent, pgRangePickerComponent ]
})
export class pgDatePickerModule {
}

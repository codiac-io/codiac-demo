import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SliderHandleComponent } from './slider-handle.component';
import { SliderMarksComponent } from './slider-marks.component';
import { SliderStepComponent } from './slider-step.component';
import { SliderTrackComponent } from './slider-track.component';
import { SliderComponent } from './slider.component';
import { SliderService } from './slider.service';

@NgModule({
  exports: [ SliderComponent, SliderTrackComponent, SliderHandleComponent, SliderStepComponent, SliderMarksComponent ],
  declarations: [ SliderComponent, SliderTrackComponent, SliderHandleComponent, SliderStepComponent, SliderMarksComponent ],
  imports: [ CommonModule, TooltipModule.forRoot() ],
  providers: [ SliderService ]
})
export class SliderModule { }

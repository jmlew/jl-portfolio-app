import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipService } from "./tooltip.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TooltipDirective,
    TooltipComponent,
    TooltipContainerComponent,
  ],
  providers: [TooltipService],
  exports: [TooltipDirective, TooltipContainerComponent],
})
export class TooltipModule { }

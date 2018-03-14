import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from "../../../../root/pipes/pipes.module";
import { TooltipModule } from "../../../../shared/tooltip/tooltip.module";

import { DetailsHeaderComponent } from './details-header.component';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    TooltipModule,
  ],
  declarations: [DetailsHeaderComponent],
  exports: [DetailsHeaderComponent],
})
export class DetailsHeaderModule { }

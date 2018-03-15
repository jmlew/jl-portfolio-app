import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { PipesModule } from "../../../../root/pipes/pipes.module";
import { TooltipModule } from "../../../../shared/tooltip/tooltip.module";

import { DetailsHeaderComponent } from './details-header.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PipesModule,
    TooltipModule,
  ],
  declarations: [DetailsHeaderComponent],
  exports: [DetailsHeaderComponent],
})
export class DetailsHeaderModule { }

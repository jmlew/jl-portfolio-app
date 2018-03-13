import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { FooterComponent } from './footer.component';
import { TooltipModule } from "../../shared/tooltip/tooltip.module";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TooltipModule,
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule { }

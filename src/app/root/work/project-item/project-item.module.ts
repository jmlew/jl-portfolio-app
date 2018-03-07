import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { TooltipModule } from "../../../shared/tooltip/tooltip.module";

import { ProjectItemComponent } from "./project-item.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TooltipModule,
  ],
  declarations: [ProjectItemComponent],
  exports: [ProjectItemComponent],
})
export class ProjectItemModule { }

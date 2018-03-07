import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ContentWrapperModule } from "../../content-wrapper/content-wrapper.module";
import { TooltipModule } from "../../../shared/tooltip/tooltip.module";

import { ProjectDetailsComponent } from './project-details.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ContentWrapperModule,
    TooltipModule,
  ],
  declarations: [ProjectDetailsComponent],
  exports: [ProjectDetailsComponent],
})
export class ProjectDetailsModule { }

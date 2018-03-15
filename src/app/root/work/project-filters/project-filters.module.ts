import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { TooltipModule } from "../../../shared/tooltip/tooltip.module";
import { ContentWrapperModule } from "../../content-wrapper/content-wrapper.module";

import { ProjectFiltersComponent } from './project-filters.component';

import { FiltersService } from "./filters.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TooltipModule,
    ContentWrapperModule,
  ],
  declarations: [ProjectFiltersComponent],
  exports: [ProjectFiltersComponent],
  providers: [FiltersService],
})
export class ProjectFiltersModule { }

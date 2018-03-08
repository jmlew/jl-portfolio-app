import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ProjectFiltersComponent } from './project-filters.component';

import { FiltersService } from "./filters.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  declarations: [ProjectFiltersComponent, NgModel],
  exports: [ProjectFiltersComponent],
  providers: [FiltersService],
})
export class ProjectFiltersModule { }

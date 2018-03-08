import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ProjectFiltersComponent } from './project-filters.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  declarations: [ProjectFiltersComponent],
  exports: [ProjectFiltersComponent],
})
export class ProjectFiltersModule { }

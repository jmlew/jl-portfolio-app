import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ContentWrapperModule } from "../../content-wrapper/content-wrapper.module";

import { ProjectDetailsComponent } from './project-details.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ContentWrapperModule,
  ],
  declarations: [ProjectDetailsComponent],
  exports: [ProjectDetailsComponent],
})
export class ProjectDetailsModule { }

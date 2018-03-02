import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ProjectItemModule } from "./project-item/project-item.module";
import { ProjectDetailsModule } from "./project-details/project-details.module";
import { ContentWrapperModule } from "../content-wrapper/content-wrapper.module";
import { WorkComponent } from './work.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProjectItemModule,
    ProjectDetailsModule,
    ContentWrapperModule,
  ],
  declarations: [WorkComponent],
})
export class WorkModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from "../../shared/tooltip/tooltip.module";
import { ProjectItemModule } from "./project-item/project-item.module";
import { ProjectDetailsModule } from "./project-details/project-details.module";
import { ContentWrapperModule } from "../content-wrapper/content-wrapper.module";
import { WorkComponent } from './work.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TooltipModule,
    ProjectItemModule,
    ProjectDetailsModule,
    ContentWrapperModule,
  ],
  declarations: [WorkComponent],
})
export class WorkModule { }

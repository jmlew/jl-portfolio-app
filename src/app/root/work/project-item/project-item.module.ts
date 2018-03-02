import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ProjectItemComponent } from "./project-item.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [ProjectItemComponent],
  exports: [ProjectItemComponent],
})
export class ProjectItemModule { }

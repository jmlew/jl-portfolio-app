import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ImageCarouselModule } from "./image-carousel/image-carousel.module";
import { ContentWrapperModule } from "../../content-wrapper/content-wrapper.module";
import { TooltipModule } from "../../../shared/tooltip/tooltip.module";
import { PipesModule } from "../../../root/pipes/pipes.module";

import { ProjectDetailsComponent } from './project-details.component';

@NgModule({
  imports: [
    CommonModule,
    ImageCarouselModule,
    FlexLayoutModule,
    ContentWrapperModule,
    TooltipModule,
    PipesModule,
  ],
  declarations: [ProjectDetailsComponent],
  exports: [ProjectDetailsComponent],
})
export class ProjectDetailsModule { }

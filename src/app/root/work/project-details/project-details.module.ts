import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { DetailsHeaderModule } from "./details-header/details-header.module";
import { ImageCarouselModule } from "./image-carousel/image-carousel.module";
import { VideoPlayerModule } from "./video-player/video-player.module";
import { ContentWrapperModule } from "../../content-wrapper/content-wrapper.module";
import { TooltipModule } from "../../../shared/tooltip/tooltip.module";
import { PipesModule } from "../../../root/pipes/pipes.module";

import { ProjectDetailsComponent } from './project-details.component';

@NgModule({
  imports: [
    CommonModule,
    DetailsHeaderModule,
    ImageCarouselModule,
    VideoPlayerModule,
    FlexLayoutModule,
    ContentWrapperModule,
    TooltipModule,
    PipesModule,
  ],
  declarations: [ProjectDetailsComponent],
  exports: [ProjectDetailsComponent],
})
export class ProjectDetailsModule { }

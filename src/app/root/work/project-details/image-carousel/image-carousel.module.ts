import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ImageCarouselComponent } from './image-carousel.component';

@NgModule({
  imports: [ CommonModule, FlexLayoutModule ],
  declarations: [ImageCarouselComponent],
  exports: [ImageCarouselComponent],
})
export class ImageCarouselModule { }

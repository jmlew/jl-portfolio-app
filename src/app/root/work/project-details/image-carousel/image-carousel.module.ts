import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageCarouselComponent],
  exports: [ImageCarouselComponent],
})
export class ImageCarouselModule { }

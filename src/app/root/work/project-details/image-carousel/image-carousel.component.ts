import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jl-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  images: string[];
  @Input() imgLocBase: string;
  @Input() imgPreviewLoc: string;

  constructor() { }

  ngOnInit() {
    this.images = this.imgPreviewLoc.split(',')
        .map((item) => item.trim());
    console.log('this.images', this.images);

  }

}

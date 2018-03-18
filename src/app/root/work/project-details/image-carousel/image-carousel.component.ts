import { Component, OnChanges, Input, HostListener } from '@angular/core';

@Component({
  selector: 'jl-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnChanges {
  items: string[];
  currentIndex: number;
  itemsLength: number;
  @Input() imgLocBase: string;
  @Input() imgPreviewLoc: string;
  private readonly keyboardShortcuts = {
    ArrowUp: this.onSelectNext,
    ArrowDown: this.onSelectPrev,
  };

  constructor() { }

  ngOnChanges() {
    this.items = this.imgPreviewLoc.split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 1);

    this.currentIndex = 0;
    this.itemsLength = this.items.length;
  }

  onSelectIndex(index: number) {
    this.currentIndex = index;
  }

  isCurrentIndex(index: number):boolean {
    return this.currentIndex === index;
  }

  onSelectNext() {
    this.currentIndex = this.currentIndex >= this.itemsLength - 1 ?
        0 : this.currentIndex + 1;
  }

  onSelectPrev() {
    this.currentIndex = this.currentIndex === 0 ?
        this.itemsLength - 1 : this.currentIndex - 1;
  }

  @HostListener('window:keydown', ['$event']) onKeyDown($event) {
    const method = this.keyboardShortcuts[$event.key];
    if (method) method.call(this);
  }
}

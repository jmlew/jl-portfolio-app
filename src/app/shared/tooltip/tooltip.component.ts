import { Component, Input, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'jl-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.scss'],
})
export class TooltipComponent implements AfterViewInit {
  private element: HTMLElement;
  private ref: HTMLElement;
  @Input() evocationRef: ElementRef;
  @Input() message: string;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    this.ref = this.evocationRef.nativeElement;
    this.position();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.position();
  }

  private position() {
    const clientRect = this.ref.getBoundingClientRect();
    this.element.style.top = clientRect.top -
        this.element.offsetHeight - 6 + window.scrollY + 'px';
    this.element.style.left = clientRect.left +
        (this.ref.offsetWidth / 2) - (this.element.offsetWidth / 2) + 'px';
  }
}

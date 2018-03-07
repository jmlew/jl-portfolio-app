import { Component, Input, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'jl-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.scss'],
})
export class TooltipComponent implements AfterViewInit {
  private element: HTMLElement;
  private refElement: HTMLElement;
  @Input() invocationRef: ElementRef;
  @Input() message: string;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    this.refElement = this.invocationRef.nativeElement;
    this.position();
  }

  @HostListener('window:resize') onWindowResize() {
    this.position();
  }

  private position() {
    const clientRect = this.refElement.getBoundingClientRect();
    this.element.style.top = clientRect.top -
        this.element.offsetHeight - 6 + window.scrollY + 'px';
    this.element.style.left = clientRect.left +
      (this.refElement.offsetWidth / 2) - (this.element.offsetWidth / 2) + 'px';
  }
}

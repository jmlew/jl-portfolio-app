import { Directive, OnDestroy, Input, HostListener, ElementRef } from '@angular/core';

import { TooltipService, ToolTip } from "./tooltip.service";
@Directive({
  selector: '[jl-tooltip]'
})
export class TooltipDirective implements OnDestroy {
  private id: number;
  toolTips: ToolTip[];
  @Input() message = '';

  constructor(
    private tooltipService: TooltipService,
    private ref: ElementRef,
  ) {
    this.toolTips = tooltipService.toolTips;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.id = Math.random();
    const tooltip: ToolTip = {
      id: this.id,
      message: this.message,
      ref: this.ref,
    };
    this.tooltipService.toolTips.push(tooltip);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.destroy();
  }

  @HostListener('click') onClick() {
    this.destroy();
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy() {
    const index = this.tooltipService.toolTips
        .findIndex((item) => item.id === this.id);
    this.tooltipService.toolTips.splice(index, 1);
  }
}

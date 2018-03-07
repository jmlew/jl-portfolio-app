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

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.id = Math.random();
    const tooltip: ToolTip = {
      id: this.id,
      message: this.message,
      ref: this.ref,
    };
    this.tooltipService.toolTips.push(tooltip);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  @HostListener('click')
  onClick(): void {
    this.destroy();
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy(): void {
    const index = this.tooltipService.toolTips
        .findIndex((item) => item.id === this.id);
    this.tooltipService.toolTips.splice(index, 1);
  }
}

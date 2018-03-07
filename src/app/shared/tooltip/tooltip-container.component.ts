import { Component } from '@angular/core';

import { TooltipService, ToolTip } from "./tooltip.service";
@Component({
  selector: 'jl-tooltip-container',
  templateUrl: './tooltip-container.component.html',
  styleUrls: ['./tooltip.scss'],
})
export class TooltipContainerComponent {
  tooltips: ToolTip[];

  constructor(private tooltipService: TooltipService) {
    this.tooltips = tooltipService.toolTips;
  }
}

import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class TooltipService {
  toolTips: ToolTip[] = [];
}

export interface ToolTip {
  id: number,
  message: string,
  ref: ElementRef,
}

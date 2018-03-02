import { Component } from '@angular/core';

import { PAGE_DIMENSIONS, NumericDimensions } from "../shared/ui-layout";

/** Root component for the entire app. */
@Component({
  moduleId: module.id,
  selector: 'jl-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  pageDimensions: NumericDimensions = PAGE_DIMENSIONS;

  constructor() {

  }
}

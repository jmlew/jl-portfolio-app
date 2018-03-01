import { Component } from '@angular/core';

import { UI_DIMENSIONS, UIDimensions } from "../shared/ui-layout.service";

/** Root component for the entire app. */
@Component({
  moduleId: module.id,
  selector: 'jl-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  dimensions: UIDimensions = UI_DIMENSIONS;

  constructor() {

  }
}

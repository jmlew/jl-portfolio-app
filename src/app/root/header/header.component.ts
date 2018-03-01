import { Component } from '@angular/core';
import { UiLayoutService, UIDimensions } from "../../shared/ui-layout.service";

@Component({
  moduleId: module.id,
  selector: 'jl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  dimensions: UIDimensions;
  constructor(
    private readonly uiLayout: UiLayoutService) {
    this.dimensions = uiLayout.dimensions;
  }
}

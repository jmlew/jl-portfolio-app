import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
import { UI_DIMENSIONS, UIDimensions } from "../../shared/ui-layout";

@Component({
  // selector: 'jl-about', // Provided via router.
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  dimensions: UIDimensions = UI_DIMENSIONS;

  constructor(
    private readonly routesService: RoutesService,
  ) {

  }

  ngOnInit() {
  }

}

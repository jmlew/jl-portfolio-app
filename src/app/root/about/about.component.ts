import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
// import { PAGE_DIMENSIONS, NumericDimensions } from "../../shared/ui-layout";

@Component({
  // selector: 'jl-about', // Provided via router.
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  // pageDimensions: NumericDimensions = PAGE_DIMENSIONS;

  constructor(
    private readonly routesService: RoutesService,
  ) {

  }

  ngOnInit() {
  }

}

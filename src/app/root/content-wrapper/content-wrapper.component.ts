import { Component, OnInit } from '@angular/core';

import { PAGE_DIMENSIONS, NumericDimensions } from "../../shared/ui-layout";

@Component({
  selector: 'jl-content-wrapper',
  templateUrl: './content-wrapper.component.html'
})
export class ContentWrapperComponent implements OnInit {
  pageDimensions: NumericDimensions = PAGE_DIMENSIONS;

  constructor() { }

  ngOnInit() {
  }

}

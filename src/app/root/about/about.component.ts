import { Component } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  isSectionShown1 = false;
  isSectionShown2 = false;
  isSectionShown3 = false;
  isSectionShown4 = false;
  isOtherEmploymentShown = false;
  constructor(private readonly routesService: RoutesService) { }
}

import { Component } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent{
  isOtherEmploymentShown = false;

  constructor(private readonly routesService: RoutesService) { }
}

import { Component } from '@angular/core';

import { RouteConfig, ROOT_ROUTE_CONFIG} from "../../shared/routes.service";

@Component({ templateUrl: './page-not-found.component.html' })
export class PageNotFoundComponent {
  routeConfig: RouteConfig = ROOT_ROUTE_CONFIG;

  constructor() { }
}

import { Component } from '@angular/core';
import { Router, Data } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { PAGE_DIMENSIONS, NumericDimensions } from "../../shared/ui-layout";
import { RouteConfig, ROOT_ROUTE_CONFIG, Route, RoutesService, RouteLevel } from "../../shared/routes.service";

@Component({
  moduleId: module.id,
  selector: 'jl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  pageDimensions: NumericDimensions = PAGE_DIMENSIONS;
  routeConfig: RouteConfig = ROOT_ROUTE_CONFIG;
  currentRoute: Route;
  activePageSubscription: Subscription;
  constructor(
    private readonly router: Router,
    private readonly routesService: RoutesService,
  ) {
    this.initObservables();
  }

  initObservables() {
    this.activePageSubscription =
      this.routesService.getRouteDataOnNavigationEnd(RouteLevel.Root)
        .subscribe((data: Data) => {
          if (data.route) this.currentRoute = data.route;
        });
  }

  onNavigateTo(route: Route) {
    this.router.navigate([route.name]);
  }
}

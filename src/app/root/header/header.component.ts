import { Component } from '@angular/core';
import { Data } from "@angular/router";
import { UiLayoutService, UIDimensions } from "../../shared/ui-layout.service";
import { RouteConfig, ROOT_ROUTE_CONFIG, Route, RoutesService, RouteLevel } from "../../shared/routes.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'jl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  dimensions: UIDimensions;
  routeConfig: RouteConfig = ROOT_ROUTE_CONFIG;
  currentRoute: Route;
  activePageSubscription: Subscription;
  constructor(
    private readonly uiLayout: UiLayoutService,
    private readonly routesService: RoutesService,
  ) {
    this.dimensions = uiLayout.dimensions;
    this.initObservables();
  }

  initObservables() {
    this.activePageSubscription =
      this.routesService.getRouteDataOnNavigationEnd(RouteLevel.Root)
        .subscribe((data: Data) => {
          if (data.route) this.currentRoute = data.route;
        });
  }
}

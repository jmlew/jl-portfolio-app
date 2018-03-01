import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Data,
  Event,
  NavigationEnd,
  ParamMap,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class RoutesService {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title,
  ) {
    this.updateCurrentPageOnRouteChange();
  }

  /**
   * Retrieves the currently activated page data from the root-level route upon
   * completion of the nagivation life-cycle and updates the page title.
   */
  private updateCurrentPageOnRouteChange() {
    this.getRouteDataOnNavigationEnd(RouteLevel.Root)
      .subscribe((data: Data) => {
        if (data.page && data.page.label) {
          this.titleService.setTitle('Jason Lewis: ' + data.page.label);
        }
      });
  }

  /**
   * Returns an observable which provides the currently activated route at the
   * end of each navigation life-cycle.
   */
  getActiveRouteOnNavigationEnd(): Observable<ActivatedRoute> {
    return this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      // Return the currently activated route.
      .map(() => this.activatedRoute);
  }

  /**
   * Returns an observable which provides the custom route data for the App's
   * root-level or secondary-level child routes which is added to the route
   * configurations which are defined in the root level routing module
   * (root/app_routing_module.ts) and secondary level modules
   * (root/manage/manage_routing_module.ts, etc.).
   */
  getRouteDataOnNavigationEnd(routeLevel: RouteLevel): Observable<Data> {
    return this.getActiveRouteOnNavigationEnd()
      .map((route: ActivatedRoute) => {
        // Retrieve the child route based on the provided route level.
        switch (routeLevel) {
          case RouteLevel.Root:
            if (route.firstChild) return route.firstChild;
            break;
          case RouteLevel.Secondary:
            if (route.firstChild && route.firstChild.firstChild) {
              return route.firstChild.firstChild;
            }
            break;
          default:
            break;
        }
        return route;
      })
      // Avoid named routes.
      .filter((route: ActivatedRoute) => route.outlet === 'primary')
      .mergeMap((route: ActivatedRoute) => route.data);
  }
}

/**
 * Configuration for the root-level page data.
 */
export const ROOT_ROUTE_CONFIG: RouteConfig = {
  work: {
    name: 'work',
    path: '/work',
    label: 'My Work',
  },
  about: {
    name: 'about',
    path: '/about',
    label: 'About Me',
  },
}

/**
 * Provides routing information and page details for the activated
 * route. This data is defined in a component's routing moudule.
 */
export interface Route {
  name: string;
  label?: string;
  path: string;
  icon?: string;
}

export interface RouteConfig { [page: string]: Route; }

/**
 * Routing levels which define the depth from the top-level route to a route
 * which contains custom data defining page configs. Root level components are
 * the first child of the root component and whose routes are defined on the
 * root component, and secondary level is the first child of the root level
 * component.
 */
export enum RouteLevel {
  Root,
  Secondary
}

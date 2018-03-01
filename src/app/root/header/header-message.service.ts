import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { RouteConfig, ROOT_ROUTE_CONFIG } from "../../shared/routes.service";

@Injectable()
export class HeaderMessageService {
  currentRoute$: BehaviorSubject<RouteConfig>;
  constructor() {


  }
}

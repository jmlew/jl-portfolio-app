import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WorkComponent } from "./work/work.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundModule } from "./page-not-found/page-not-found.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { RouteConfig, ROOT_ROUTE_CONFIG } from "../shared/routes.service";

const rootRoutes: Routes = [
  {
    path: ROOT_ROUTE_CONFIG.work.name,
    component: WorkComponent,
    data: { route: ROOT_ROUTE_CONFIG.work },
  },
  {
    path: ROOT_ROUTE_CONFIG.work.name + '/:id',
    component: WorkComponent,
    data: { route: ROOT_ROUTE_CONFIG.work },
  },
  {
    path: ROOT_ROUTE_CONFIG.about.name,
    component: AboutComponent,
    data: { route: ROOT_ROUTE_CONFIG.about },
  },
  {
    path: '',
    redirectTo: ROOT_ROUTE_CONFIG.work.name,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      rootRoutes,
      // { enableTracing: true }
    )
  ],
  exports: [RouterModule, PageNotFoundModule]
})
export class RootRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { WorkModule } from "./work/work.module";
import { AboutModule } from "./about/about.module";
import { RootRoutingModule } from "./root-routing.module";
import { HeaderModule } from './header/header.module';
import { GapiSheetsModule } from "../shared/gapi-sheets.module";

import { RootComponent } from './root.component';

import { RoutesService } from "../shared/routes.service";
import { DataService } from "../shared/data-service.service";


@NgModule({
  declarations: [ RootComponent ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HeaderModule,
    WorkModule,
    AboutModule,
    GapiSheetsModule,
    RootRoutingModule,
  ],
  providers: [
    // Ensuring app served with alternative baseUrl redirects pages properly.
    // Remove for prod.
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    DataService,
    RoutesService,
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }

import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { GapiSheetsModule } from "../shared/gapi-sheets.module";

import { RootComponent } from './root.component';

import { DataService } from "../shared/data-service.service";
import { UiLayoutService } from "../shared/ui-layout.service";


@NgModule({
  declarations: [ RootComponent ],
  imports: [
    BrowserModule,
    HeaderModule,
    GapiSheetsModule,
  ],
  providers: [
    // Ensuring app served with alternative baseUrl redirects pages properly.
    // Remove for prod.
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    DataService,
    UiLayoutService,
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }

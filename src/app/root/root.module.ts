import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { GapiSheetsModule } from "../shared/gapi_sheets_module";

import { RootComponent } from './root.component';

import { DataService } from "../shared/data_service";


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
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }

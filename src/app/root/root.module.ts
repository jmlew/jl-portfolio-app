import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataService } from "../shared/data_service";
import { GapiSheetsModule } from "../shared/gapi_sheets_module";

import { RootComponent } from './root.component';

@NgModule({
  declarations: [ RootComponent ],
  imports: [
    BrowserModule,
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

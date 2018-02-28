import { NgModule } from '@angular/core';
import { GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ng-gapi/lib';

import { SHEETS_CONFIG, GapiSheetsService } from './gapi_sheets';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: SHEETS_CONFIG.clientId,
  scope: SHEETS_CONFIG.scopeReadonly,
  discoveryDocs: SHEETS_CONFIG.discoveryDocs,
};

@NgModule({
  imports: [
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig,
    }),
  ],
  providers: [GapiSheetsService]
})
export class GapiSheetsModule {
}

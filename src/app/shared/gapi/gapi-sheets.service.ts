import { Injectable } from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi/lib';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GapiSheetsService {
  isApiReady = false;

  constructor(private gApiService: GoogleApiService) { }

  apiOnLoad(): Observable<void> {
    return this.gApiService.onLoad();
  }

  async initSheetsApi(): Promise<void | {}> {
    if (this.isApiReady) return new Promise((resolve) => resolve());
    await this.loadClient();
    this.isApiReady = true;
    return this.initClient();
  }

  private loadClient(): Promise<{}> {
    return new Promise((resolve, reject) => {
      gapi.load('client', {
        callback: resolve, // @type gapi.LoadCallback returns void.
        onerror: reject,
        timeout: 1000,
        ontimeout: reject
      });
    });
  }

  private initClient(): Promise<{}> {
    const config = {
      apiKey: SHEETS_CONFIG.apiKey,
      discoveryDocs: SHEETS_CONFIG.discoveryDocs,
      // Below calls alternatively handled via auth2 in DataGoogleSheetsModule.
      // clientId: SHEETS_CONFIG.clientId,
      // scope: SHEETS_CONFIG.scopeReadonly,
    };
    return new Promise((resolve) => {
      gapi.client.init(config).then(() => resolve());
    });
  }

  getSheetData(range: string, dimension: SheetDimension) {
    const sheets = gapi.client['sheets'];
    return sheets.spreadsheets.values.get({
      range,
      majorDimension: dimension,
      spreadsheetId: SHEETS_CONFIG.spreadsheetId,
    });
  }
}

export const SHEETS_CONFIG = {
  apiKey: 'AIzaSyAUXiE7PYh78BY8nWmVWdjLA3yNC93z-rY',
  clientId: '523462684498-3g05pgspo2hohqvn58ekldmp0utr76av.apps.googleusercontent.com',
  spreadsheetId: '19iDmgtY9P1NCF10XvdgcyY0bOBvT-v__UWUVX7reJ1c',
  scopeReadonly: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
};

export enum SheetDimension {
  ROWS = 'ROWS',
  COLUMNS = 'COLUMNS',
}

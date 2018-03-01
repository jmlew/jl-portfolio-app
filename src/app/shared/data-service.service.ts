import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GapiSheetsService } from './gapi-sheets.service';

@Injectable()
export class DataService {
  private gapiLoadSubscription: Subscription;
  constructor(
    private readonly gapiSheetsService: GapiSheetsService,
  ) { }

  loadSheetsData(config: SheetConfig): Promise<string[][]> {
    return this.initSheetsApi().then(() => this.getSheetsData(config));
  }

  private initSheetsApi(): Promise<{}> {
    return new Promise((resolve) => {
      // Load the Sheets API and get data.
      if (this.gapiSheetsService.isApiReady) {
        resolve();
      } else {
        this.gapiLoadSubscription =
            this.gapiSheetsService.apiOnLoad().subscribe(() => {
              this.gapiSheetsService.initSheetsApi().then(() => resolve());
              this.gapiLoadSubscription.unsubscribe();
            });
      }
    });
  }

  private getSheetsData(config: SheetConfig): Promise<string[][]> {
    return new Promise((resolve) => {
      const sheet = config.tab + config.cells;
      return this.gapiSheetsService.getSheetData(sheet)
        .then(
          (response) => resolve(response.result.values),
          (error) => {
            console.log('error getting sheets data: ', error.result.error);
          });
    });
  }
}

interface SheetConfig {
  tab: string;
  cells: string;
}

interface SheetConfigCollection {
  [config: string]: SheetConfig;
}

export const SHEETS: SheetConfigCollection = {
  projects: {
    tab: 'projects!',
    cells: 'B1:Z',
  }
};

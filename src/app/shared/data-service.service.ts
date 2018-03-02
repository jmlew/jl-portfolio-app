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

  createDataConfig(sheetRows: string[][]): DataConfig {
    const ids: string[] = sheetRows[0];
    const values: string[] = sheetRows[1];
    return ids.reduce((accum, id, index) => {
      accum[id] = values[index];
      return accum;
    }, {});
  }

  createProjectProps(sheetRows: string[][]): ProjectProps {
    const ids: string[] = sheetRows[0];
    const labels: string[] = sheetRows[1];
    return ids.reduce((accum, id, index) => {
      accum[id] = {
        label: labels[index],
        isActive: false,
      };
      return accum;
    }, {});
  }

  createProjectItems(
      sheetRows: string[][],
      dataConfig: DataConfig): ProjectItem[] {
    const ids: string[] = sheetRows[0];
    const projectItems: ProjectItem[] = [];
    const dataRowStart = 2; // Row at which the header ends and projects begin.
    for (let rowIndex = dataRowStart; rowIndex < sheetRows.length; rowIndex++) {
      const item: ProjectItem = {};
      sheetRows[rowIndex].forEach((value: string, index: number) => {
        const id: string = ids[index];
        if (id) {
          switch (id) {
            case 'imgThumbLoc':
              item[id] = dataConfig.imgThumbLocBase + value;
              break;
            case 'imgPreviewLoc':
              item[id] = dataConfig.imgPreviewLocBase + value;
              break;
            default:
              item[id] = value;
              break;
          }
        }
      });
      projectItems.push(item);
    }
    return projectItems;
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
  },
  config: {
    tab: 'config!',
    cells: 'B1:Z2',
  }
};

export interface DataConfig {
  [id: string]: string;
}

interface ProjectProp {
  label: string;
  isActive: boolean;
}

export interface ProjectProps {
  [id: string]: ProjectProp;
}

export type ProjectItemValue = string | number | Date;
export interface ProjectItem { [id: string]: ProjectItemValue; }

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

  createProjectProps(sheetRows: string[][]): ProjectProp[] {
    const projectProps = [];
    const propertyIds: string[] = sheetRows[0];
    const propertyLabels: string[] = sheetRows[1];
    propertyIds.forEach((id, index) => {
      const dataProperty: ProjectProp = {
        id,
        label: propertyLabels[index],
        isActive: false,
      };
      projectProps.push(dataProperty);
    });
    return projectProps;
  }

  createProjectItems(sheetRows: string[][], projectProps: ProjectProp[]): ProjectItem[] {
    const projectItems: ProjectItem[] = [];
    const dataRowStart = 2; // Row at which the header ends and the bugs begin.
    for (let rowIndex = dataRowStart; rowIndex < sheetRows.length; rowIndex++) {
      const dataItem: ProjectItem = {};
      sheetRows[rowIndex].forEach((item: string, index: number) => {
        const dataProperty: ProjectProp = projectProps[index];
        if (dataProperty) {
          dataItem[dataProperty.id] = item;
        }
      });
      projectItems.push(dataItem);
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
  }
};

export interface ProjectProp {
  id: string;
  label: string;
  isActive: boolean;
}

export type ProjectItemValue = string | number | Date;
export interface ProjectItem { [id: string]: ProjectItemValue; }

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GapiSheetsService, SheetDimension } from './gapi/gapi-sheets.service';

import { StringMap, MODEL } from "./model";

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
      return this.gapiSheetsService.getSheetData(sheet, config.dimension)
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

  createDataEnums(sheetCols: string[][]): DataEnums {
    const enums: DataEnums = {};
    sheetCols.forEach((rows, index) => {
      const values = [];
      rows.forEach((item, index) => {
        if (index === 0) {
          enums[item] = values;
        } else {
          values.push(item);
        }
      });
    });
    return enums;
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
      dataConfig: DataConfig,
      dataEnums: DataEnums): ProjectItem[] {
    const ids: string[] = sheetRows[0];
    const isEnabledIndex = ids.indexOf(MODEL.isEnabled);
    const projectItems: ProjectItem[] = [];
    const dataRowStart = 2; // Row at which the header ends and projects begin.
    for (let rowIndex = dataRowStart; rowIndex < sheetRows.length; rowIndex++) {
      const row: string[] = sheetRows[rowIndex];
      if (row[isEnabledIndex] === 'TRUE') {
        const item: ProjectItem = row.reduce((accum, value, index) => {
          const id = ids[index];
          if (dataEnums[id]) {
            // Convert enums from indecies to their string values.
            accum[id] = value ? this.convertEnums(dataEnums[id], value) : null;
          } else {
            switch (id) {
              case MODEL.tasks:
              case MODEL.description:
                // Split string into an array using the pipe delimiter.
                accum[id] = value ? value
                    .split(CHARS.PIPE)
                    .filter(item => item) : null;
                break;
              default:
                accum[id] = value;
                break;
            }
          }
          return accum;
        }, {});
        item.outputs = this.createOutputCollection(item);
        projectItems.push(item);
      }
    }
    return projectItems;
  }

  private convertEnums(enumValues: string[], value: string): string[]|null {
    return value.split(',')
      .filter(item => item)
      .map((item) => item.trim())
      .map((item) => enumValues[parseInt(item) - 1]);
  }

  private createOutputCollection(item: ProjectItem): ItemOutput[] {
    const outputs = ITEM_OUTPUTS.map((itemUrl: ItemOutput) => {
      const url = item[itemUrl.id];
      return url ? {
        id: itemUrl.id,
        message: itemUrl.message,
        icon: itemUrl.icon,
        url: url,
      } : null;
    }).filter(item => item);
    return outputs.length > 0 ? outputs : null;
  }
}

enum CHARS {
  PIPE = '|'
};

interface ItemOutput {
  id: string;
  message: string;
  icon: string;
  url?: string;
}

const ITEM_OUTPUTS: ItemOutput[] = [
  {
    id: 'urlPreview',
    message: 'View Demo',
    icon: 'eye',
  },
  {
    id: 'urlPreviewSwf',
    message: 'View Demo (requires Flash)',
    icon: 'eye',
  },
  {
    id: 'urlScreencast',
    message: 'View Screencast',
    icon: 'film',
  },
  {
    id: 'urlPrototype',
    message: 'View Prototype',
    icon: 'cogs',
  },
  {
    id: 'urlCode',
    message: 'View Code',
    icon: 'code',
  },
  {
    id: 'urlMocks',
    message: 'View Mocks',
    icon: 'paint-brush',
  },
  {
    id: 'urlWireframes',
    message: 'View Wireframes',
    icon: 'pencil-alt',
  },
];

interface SheetConfig {
  tab: string;
  cells: string;
  dimension: SheetDimension;
}

interface SheetConfigCollection {
  [config: string]: SheetConfig;
}

export const SHEETS: SheetConfigCollection = {
  projects: {
    tab: 'projects!',
    cells: 'B1:Z',
    dimension: SheetDimension.ROWS,
  },
  config: {
    tab: 'config!',
    cells: 'B1:Z2',
    dimension: SheetDimension.ROWS,
  },
  enums: {
    tab: 'enums!',
    cells: 'B1:E',
    dimension: SheetDimension.COLUMNS,
  }
};

export interface DataConfig {
  [id: string]: string;
}

export interface DataEnums {
  [id: string]: string[];
}

interface ProjectProp {
  label: string;
  isActive: boolean;
}

export interface ProjectProps {
  [id: string]: ProjectProp;
}

export type ProjectItemValue = any;
// export type ProjectItemValue = string | number | string[];
export interface ProjectItem { [id: string]: ProjectItemValue; }

import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
import { DataService, SHEETS, ProjectItem, ProjectProp } from '../../shared/data-service.service';
import { DataStoreService, DATA_PROP } from "../../shared/data-store.service";
import { PAGE_DIMENSIONS, UI_DIMENSIONS, NumericDimensions } from "../../shared/ui-layout";
import { LOAD_STATE, State } from "../../shared/states";

@Component({
  // selector: 'jl-work', // Provided via router.
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  isDataLocal = false;
  pageDimensions: NumericDimensions = PAGE_DIMENSIONS;
  uiDimensions: NumericDimensions = UI_DIMENSIONS;
  loadState: State = LOAD_STATE;
  dataLoadedState: string;
  projectItems: ProjectItem[];
  projectProps: ProjectProp[];

  constructor(
    private readonly routesService: RoutesService,
    private readonly dataService: DataService,
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {
    this.dataLoadedState = LOAD_STATE.loading;
    if (this.dataStore.projectItems) {
      this.projectItems = this.dataStore.projectItems;
      this.dataLoadedState = LOAD_STATE.loaded;
    } else {
      if (this.isDataLocal) {
        console.log('loading local mock data');
        this.dataLoadedState = LOAD_STATE.loaded;
      } else {
        console.log('loading sheets data');
        this.dataService.loadSheetsData(SHEETS.projects)
          .then((data: string[][]) => {
            this.storeProjectsData(data);
            this.dataLoadedState = LOAD_STATE.loaded;
            console.log('projectProps', this.projectProps);
            console.log('projectItems', this.projectItems);

          });
      }
    }
  }

  private storeProjectsData(sheetRows: string[][]) {
    // Ensure data is set to the store.
    this.dataStore.projectProps =
        this.dataService.createProjectProps(sheetRows);
    this.dataStore.projectItems =
      this.dataService.createProjectItems(sheetRows, this.dataStore.projectProps);

    // Apply data to component.
    this.projectProps = this.dataStore.projectProps;
    this.projectItems = this.dataStore.projectItems;
  }
}

import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
import { DataService, SHEETS } from '../../shared/data-service.service';
import { DataStoreService, DATA_PROP } from "../../shared/data-store.service";
import { UI_DIMENSIONS, UIDimensions } from "../../shared/ui-layout";
import { LOAD_STATE, State } from "../../shared/states";

@Component({
  // selector: 'jl-work', // Provided via router.
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  isDataLocal = false;
  dimensions: UIDimensions = UI_DIMENSIONS;
  loadState: State = LOAD_STATE;
  dataLoadedState: string;
  projects = null;

  constructor(
    private readonly routesService: RoutesService,
    private readonly dataService: DataService,
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {
    this.dataLoadedState = LOAD_STATE.loading;
    const projects = this.dataStore.getItem(DATA_PROP.projects);
    if (projects) {
      this.projects = projects;
      this.dataLoadedState = LOAD_STATE.loaded;
    } else {
      if (this.isDataLocal) {
        console.log('loading local mock data');
        this.dataLoadedState = LOAD_STATE.loaded;
      } else {
        console.log('loading sheets data');
        this.dataService.loadSheetsData(SHEETS.projects)
          .then((data: string[][]) => {
            this.projects = data;
            console.log('sheet data: ', this.projects);
            this.dataStore.setItem(DATA_PROP.projects, data);
            this.dataLoadedState = LOAD_STATE.loaded;
          });

      }
    }
  }
}

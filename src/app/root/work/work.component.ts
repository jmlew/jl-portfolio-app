import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
import { DataService, SHEETS } from '../../shared/data-service.service';
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
  dataLoaded: string;

  constructor(
    private readonly routesService: RoutesService,
    private readonly dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataLoaded = LOAD_STATE.loading;
    if (this.isDataLocal) {
      console.log('loading local mock data');
      this.dataLoaded = LOAD_STATE.loaded;
    } else {
      console.log('loading sheets data');
      this.dataService.loadSheetsData(SHEETS.projects)
        .then((data: string[][]) => {
          console.log('sheet data: ', data);
          this.dataLoaded = LOAD_STATE.loaded;
        });

    }
  }
}

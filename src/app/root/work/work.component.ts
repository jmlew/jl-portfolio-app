import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
import { DataService, SHEETS } from '../../shared/data-service.service';
import { UI_DIMENSIONS, UIDimensions } from "../../shared/ui-layout.service";

@Component({
  // selector: 'jl-work', // Provided via router.
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  dimensions: UIDimensions = UI_DIMENSIONS;
  isDataLocal = true;
  isDataLoaded = false;

  constructor(
    private readonly routesService: RoutesService,
    private readonly dataService: DataService,
  ) {
    this.initData();
  }

  ngOnInit() {
  }

  private initData() {
    if (this.isDataLocal) {
      console.log('loading local mock data');
    } else {
      console.log('loading sheets data');
      this.dataService.loadSheetsData(SHEETS.projects)
        .then((data: string[][]) => {
          console.log('sheet data: ', data);
          this.isDataLoaded = true;
        });

    }
  }

}

import { Component } from '@angular/core';
import { DataService, SHEETS } from '../shared/data-service.service';

/** Root component for the entire app. */
@Component({
  moduleId: module.id,
  selector: 'jl-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  isDataLocal = true;
  isDataLoaded = false;
  constructor(
    private readonly dataService: DataService
  ) {
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

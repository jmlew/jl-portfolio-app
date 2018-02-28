import { Component } from '@angular/core';
import { DataService } from '../shared/data_service';
import { SHEETS } from "../shared/data_service";

/** Root component for the entire app. */
@Component({
  moduleId: module.id,
  selector: 'jl-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  isDataLoaded = false;
  constructor(
    private readonly dataService: DataService
  ) {
    this.dataService.loadSheetsData(SHEETS.projects)
        .then((data: string[][]) => {
          console.log('sheet data: ', data);
          this.isDataLoaded = true;
        });
  }
}

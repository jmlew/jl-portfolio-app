import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';

import { RoutesService } from "../../shared/routes.service";
import { DataService, DataConfig, ProjectItem, ProjectProps, SHEETS } from '../../shared/data-service.service';
import { DataStoreService, DATA_PROP } from "../../shared/data-store.service";
import { LOAD_STATE, State } from "../../shared/states";

@Component({
  // selector: 'jl-work', // Provided via router.
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  loadState: State = LOAD_STATE;
  dataLoadedState: string;
  projectItems: ProjectItem[];
  projectProps: ProjectProps;
  dataConfig: DataConfig;
  currentProjectItem: ProjectItem;
  isProjectDetailsShown = false;

  constructor(
    private readonly routesService: RoutesService,
    private readonly dataService: DataService,
    private readonly dataStore: DataStoreService,
    private readonly renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.initProjectsData();
  }

  onOpenProjectDetails(item: ProjectItem) {
    this.currentProjectItem = item;
    this.isProjectDetailsShown = true;
    // Lock body scrolling.
    this.renderer.addClass(document.body, 'lock-overflow-y');
  }

  onCloseProjectDetails() {
    this.isProjectDetailsShown = false;
    // Unock body scrolling.
    this.renderer.removeClass(document.body, 'lock-overflow-y');
  }

  onOpenLink(url: string) {
    window.open(url, '_blank');
  }

  private initProjectsData() {
    this.dataLoadedState = LOAD_STATE.loading;
    if (this.dataStore.projectItems) {
      this.setStoredData();
      this.dataLoadedState = LOAD_STATE.loaded;
    } else {
      console.log('loading sheets data');
      this.dataService.loadSheetsData(SHEETS.config)
        .then((data: string[][]) => {
          this.dataStore.dataConfig = this.dataService.createDataConfig(data);
          return this.dataService.loadSheetsData(SHEETS.enums);
        })
        .then((data: string[][]) => {
          this.dataStore.dataEnums = this.dataService.createDataEnums(data);
          return this.dataService.loadSheetsData(SHEETS.projects);
        })
        .then((data: string[][]) => {
          this.dataStore.projectProps =
          this.dataService.createProjectProps(data);
          this.dataStore.projectItems = this.dataService.createProjectItems(
              data,
              this.dataStore.dataConfig,
              this.dataStore.dataEnums
          );
          this.setStoredData();
          this.dataLoadedState = LOAD_STATE.loaded;
        });
    }
  }

  /**
   * Sets the projects data to the component from the data store.
   * */
  private setStoredData() {
    this.projectItems = this.dataStore.projectItems;
    this.projectProps = this.dataStore.projectProps;
    this.dataConfig = this.dataStore.dataConfig;
    console.log('dataConfig', this.dataConfig);
    console.log('projectProps', this.projectProps);
    console.log('projectItems', this.projectItems);
  }
}

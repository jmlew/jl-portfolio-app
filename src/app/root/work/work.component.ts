import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { RoutesService } from "../../shared/routes.service";
import { DataService, DataConfig, ProjectItem, ProjectProps, SHEETS } from '../../shared/data-service.service';
import { DataStoreService, DATA_PROP } from "../../shared/data-store.service";
import { LOAD_STATE, VISIBLE_STATE, State } from "../../shared/states";

@Component({
  // selector: 'jl-work', // Provided via router.
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [
    trigger(
      'filtersVisible',
      [
        state('hidden', style({ height: '0' })),
        state('visible', style({ height: '*' })),
        transition('hidden => visible', animate('300ms ease-out')),
        transition('visible => hidden', animate('200ms ease-in-out'))
      ]),
    trigger(
      'btnFiltersVisible',
      [
        state('hidden', style({ transform: 'rotateZ(0)' })),
        state('visible', style({ transform: 'rotateZ(180deg)' })),
        transition('hidden => visible', animate('200ms ease-out')),
        transition('visible => hidden', animate('150ms ease-in-out'))
      ])
  ]
})
export class WorkComponent implements OnInit {
  readonly LOAD_STATE: State = LOAD_STATE;
  readonly VISIBLE_STATE: State = VISIBLE_STATE;
  filtersVisibleState: string = VISIBLE_STATE.hidden;
  dataLoadedState: string = LOAD_STATE.unloaded;
  isFiltersVisible = false;
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

  onToggleFiltersVisible() {
    this.isFiltersVisible = ! this.isFiltersVisible;
    this.filtersVisibleState =
        this.isFiltersVisible ? VISIBLE_STATE.visible : VISIBLE_STATE.hidden;
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

  /** Sets the projects data to the component from the data store. */
  private setStoredData() {
    this.projectItems = this.dataStore.projectItems;
    this.projectProps = this.dataStore.projectProps;
    this.dataConfig = this.dataStore.dataConfig;
  }
}

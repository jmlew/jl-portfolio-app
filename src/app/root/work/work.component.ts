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
import {
  DataService,
  DataConfig,
  DataEnums,
  ProjectItem,
  ProjectProps,
  SHEETS,
} from '../../shared/data-service.service';
import { FiltersService, Filter, FilterControl } from "./project-filters/filters.service";
import { DataStoreService, DATA_PROP } from "../../shared/data-store.service";
import { LOAD_STATE, VISIBLE_STATE, State } from "../../shared/states";

@Component({
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [
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
  dataLoadedState: string = LOAD_STATE.unloaded;
  filtersVisibleState: string;
  isFiltersVisible: boolean;
  projectItems: ProjectItem[];
  projectProps: ProjectProps;
  dataEnums: DataEnums;
  dataConfig: DataConfig;
  currentProjectItem: ProjectItem;
  isProjectDetailsVisible = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly routesService: RoutesService,
    private readonly dataService: DataService,
    private readonly dataStore: DataStoreService,
    private readonly filtersService: FiltersService,
  ) { }

  ngOnInit() {
    this.dataLoadedState = LOAD_STATE.loading;
    if (this.dataStore.projectItems) {
      this.render();
    } else {
      this.loadData().then(() => this.render());
    }
  }

  private render() {
    console.log('WorkComponent render()');

    this.dataEnums = this.dataStore.dataEnums;
    this.dataConfig = this.dataStore.dataConfig;
    this.projectProps = this.dataStore.projectProps;
    this.projectItems = this.filtersService.filters ?
        this.filtersService.filterItems(this.dataStore.projectItems) :
        this.dataStore.projectItems;

    this.isFiltersVisible = this.dataStore.isFiltersVisible || false;
    this.updateFiltersVisibleState();

    // tmp!
    this.onOpenProjectDetails(this.projectItems[0]);

    this.dataLoadedState = LOAD_STATE.loaded;


    console.log('view compooonent filters panel init from here?');

  }

  private loadData() {
    return new Promise((resolve) => {
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
                this.dataStore.dataEnums);
            resolve();
          });
    });
  }

  onOpenProjectDetails(item: ProjectItem) {
    this.currentProjectItem = item;
    this.isProjectDetailsVisible = true;
    // Lock body scrolling.
    this.renderer.addClass(document.body, 'lock-overflow-y');
  }

  onCloseProjectDetails() {
    this.isProjectDetailsVisible = false;
    // Unlock body scrolling.
    this.renderer.removeClass(document.body, 'lock-overflow-y');
  }

  onOpenLink(url: string) {
    window.open(url, '_blank');
  }

  onToggleFiltersVisible() {
    this.isFiltersVisible = ! this.isFiltersVisible;
    this.updateFiltersVisibleState();
  }

  private updateFiltersVisibleState() {
    this.dataStore.isFiltersVisible = this.isFiltersVisible;
    this.filtersVisibleState =
      this.isFiltersVisible ? VISIBLE_STATE.visible : VISIBLE_STATE.hidden;
  }

  onFiltersChanged() {
    this.projectItems =
        this.filtersService.filterItems(this.dataStore.projectItems);
  }
}

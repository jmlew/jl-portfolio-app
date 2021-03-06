import { Component, ViewChild, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { RoutesService } from "../../shared/routes.service";
import { DataService, DataConfig, DataEnums, ProjectItem, ProjectProps, SHEETS } from '../../shared/data-service.service';
import { FiltersService, Filter, FilterControl } from "./project-filters/filters.service";
import { ProjectFiltersComponent } from "./project-filters/project-filters.component";
import { DataStoreService, DATA_PROP } from "../../shared/data-store.service";
import { LOAD_STATE, VISIBLE_STATE, State } from "../../shared/states";
@Component({
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [
    trigger(
      'btnFiltersVisible',
      [
        state('hidden', style({
          'transform': 'rotateZ(0)',
          'margin-bottom': '-5px',
        })),
        state('visible', style({
          'transform': 'rotateZ(180deg)',
          'margin-bottom': '0',
        })),
        transition('hidden => visible', animate('200ms ease-out')),
        transition('visible => hidden', animate('150ms ease-in-out'))
      ])
  ]
})
export class WorkComponent implements OnInit {
  readonly LOAD_STATE: State = LOAD_STATE;
  readonly VISIBLE_STATE: State = VISIBLE_STATE;
  dataLoadedState: string = LOAD_STATE.unloaded;
  filtersVisibleState: string = VISIBLE_STATE.hidden;
  isFiltersVisible = false;
  projectItems: ProjectItem[];
  projectProps: ProjectProps;
  dataEnums: DataEnums;
  dataConfig: DataConfig;
  currentProjectItem: ProjectItem;
  currentProjectItemIndex: number;
  isProjectDetailsVisible = false;
  @ViewChild(ProjectFiltersComponent)
  private projectFilters: ProjectFiltersComponent;

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
      this.init();
    } else {
      this.loadData().then(() => this.init());
    }
  }

  private init() {
    this.dataEnums = this.dataStore.dataEnums;
    this.dataConfig = this.dataStore.dataConfig;
    this.projectProps = this.dataStore.projectProps;
    if (this.filtersService.filters) {
      this.projectFilters.createFiltersView();
      this.filterProjectItems();
      this.isFiltersVisible = this.dataStore.isFiltersVisible;
      this.updateFiltersVisibleState();
      this.dataLoadedState = LOAD_STATE.loaded;
    } else {
      setTimeout(() => this.projectFilters.initFilters());
    }
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

  onFiltersInit() {
    this.filterProjectItems();
    setTimeout(() => {
      this.isFiltersVisible = true;
      this.dataStore.isFiltersVisible = this.isFiltersVisible;
      this.updateFiltersVisibleState();
    }, AUTO_REVEAL_FILTERS_DELAY);
    this.dataLoadedState = LOAD_STATE.loaded;
  }

  private filterProjectItems() {
    this.projectItems =
      this.filtersService.filterItems(this.dataStore.projectItems);
  }

  onOpenProject(item: ProjectItem) {
    this.currentProjectItem = item;
    this.currentProjectItemIndex = this.projectItems.indexOf(item);
    this.isProjectDetailsVisible = true;
    // Lock body scrolling.
    this.renderer.addClass(document.body, 'lock-overflow-y');
  }

  onCloseProject() {
    this.isProjectDetailsVisible = false;
    // Unlock body scrolling.
    this.renderer.removeClass(document.body, 'lock-overflow-y');
  }

  onSelectProject(index: number) {
    this.currentProjectItemIndex = index;
    this.currentProjectItem = this.projectItems[this.currentProjectItemIndex];
  }

  onOpenLink(url: string) {
    window.open(url, '_blank');
  }

  onToggleFiltersVisible() {
    this.isFiltersVisible = ! this.isFiltersVisible;
    this.dataStore.isFiltersVisible = this.isFiltersVisible;
    this.updateFiltersVisibleState();
  }

  private updateFiltersVisibleState() {
    this.filtersVisibleState =
      this.isFiltersVisible ? VISIBLE_STATE.visible : VISIBLE_STATE.hidden;
  }

  onFiltersChanged() {
    this.projectItems =
        this.filtersService.filterItems(this.dataStore.projectItems);
  }
}

const AUTO_REVEAL_FILTERS_DELAY = 1200;

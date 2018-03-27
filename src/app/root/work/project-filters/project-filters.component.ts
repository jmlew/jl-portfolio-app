import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { FiltersService, Filter, FilterControl } from "./filters.service";
import { ProjectItem, ProjectProps, DataEnums } from '../../../shared/data-service.service';
import { VISIBLE_STATE, State } from "../../../shared/states";
import { StringMap, MODEL } from "../../../shared/model";

@Component({
  selector: 'jl-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss'],
  animations: [
    trigger(
      'filtersVisible',
      [
        state('hidden', style({ height: '1rem' })),
        state('visible', style({ height: '*' })),
        transition('hidden => visible', animate('300ms ease-out')),
        transition('visible => hidden', animate('200ms ease-in-out'))
      ]),
  ]
})
export class ProjectFiltersComponent {
  @Input() isVisible: boolean;
  @Input() visibleState: string;
  @Input() projectProps: ProjectProps;
  @Input() dataEnums: DataEnums;;
  @Input() projectItems: ProjectItem[];
  @Output() filtersChanged = new EventEmitter<void>();
  @Output() filtersInit = new EventEmitter<void>();
  readonly MODEL: StringMap = MODEL;
  filters: Filter[];
  isSkillsShown = false;

  constructor(private readonly filtersService: FiltersService) { }

  initFilters() {
    this.createFilters();
    this.createFiltersView();
    this.filtersInit.emit();
  }

  private createFilters() {
    const initiallyActiveFilters = [
      this.dataEnums[MODEL.projectType][0],
      this.dataEnums[MODEL.projectType][1],
      this.dataEnums[MODEL.projectType][2],
    ];
    this.filtersService.initFilters(initiallyActiveFilters);
    enumFilters.forEach((prop) => {
      const label = this.projectProps[prop].label;
      const values = this.dataEnums[prop];
      // const isShown = prop === MODEL.projectType ? true : false;
      const isShown = true;
      this.filtersService.addFilter(prop, label, values, isShown);
    });
  }

  createFiltersView() {
    this.filters = this.filtersService.filters;
  }

  onChangeFilterControl(control: FilterControl) {
    control.isActive = !control.isActive;
    this.filtersChanged.emit();
  }

  onClearFilter(filter: Filter) {
    this.filtersService.clearFilter(filter);
    this.filtersChanged.emit();
  }

  isFilterActive(filter: Filter): boolean {
    return this.filtersService.isFilterActive(filter);
  }

  onVisibleChangeDone(event: AnimationEvent) {

  }
}

const enumFilters = [
  MODEL.projectType,
  MODEL.projectSkills,
  // MODEL.company,
];

import {
  Component,
  OnInit,
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
import { MODEL } from "../../../shared/model";

@Component({
  selector: 'jl-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss'],
  animations: [
    trigger(
      'filtersVisible',
      [
        state('hidden', style({ height: '0' })),
        state('visible', style({ height: '*' })),
        transition('hidden => visible', animate('200ms ease-out')),
        transition('visible => hidden', animate('200ms ease'))
      ]),
  ]
})
export class ProjectFiltersComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() visibleState: string;
  @Input() projectProps: ProjectProps;
  @Input() dataEnums: DataEnums;;
  @Input() projectItems: ProjectItem[];
  @Output() filtersChanged = new EventEmitter<void>();
  filters: Filter[];

  constructor(private readonly filtersService: FiltersService) { }

  ngOnInit() {
    console.log('ProjectFiltersComponent ngOnInit', this.filtersService.filters);

    if (!this.filtersService.filters) this.createFilters();
    this.filters = this.filtersService.filters;
  }

  private createFilters() {
    this.filtersService.initFilters();
    enumFilters.forEach((prop) => {
      const label = this.projectProps[prop].label;
      const values = this.dataEnums[prop];
      this.filtersService.addFilter(prop, label, values);
    });
  }

  onChangeFilterControl(control: FilterControl, value: boolean) {
    control.isActive = value;
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
import { Injectable } from '@angular/core';
import {
  ProjectItem,
  ProjectItemValue,
  ProjectProps,
} from '../../../shared/data-service.service';

@Injectable()
export class FiltersService {
  filters: Filter[];
  private initiallyActive: string[];
  constructor() { }

  initFilters(initiallyActive: string[]) {
    this.initiallyActive = initiallyActive;
    this.filters = [];
  }

  addFilter(property: string, label: string, values: string[], isShown:boolean) {
    const filter: Filter = {
      property: property,
      label: label,
      isShown: isShown,
      controls: this.createFilterControls(property, values),
    };
    this.filters.push(filter);
  }

  private createFilterControls(property: string, values: string[]): FilterControl[] {
    return values.map((value) => {
      return {
        name: value,
        id: (property + value).replace(/\s/g, ''),
        isActive: this.initiallyActive.includes(value),
      };
    });
  }

  filterItems(items: ProjectItem[]): ProjectItem[] {
    return items.filter((item: ProjectItem) => this.validateItem(item));
  }

  private validateItem(item: ProjectItem): boolean {
    return this.filters.every((filter: Filter) => {
      const property = filter.property;
      const itemValues: string[] = item[property];
      // Pass if no project item values exist for the filterable property.
      if (!itemValues) {
        console.warn(` No values matching filterable property:
            ${property} for project: ${item.title}`);
        return true;
      }
      // Pass if no filters are active for the given property.
      const noneSelected = filter.controls.every(
          (control: FilterControl) => control.isActive === false);
      // Pass if one or more active filters match the item's values.
      const matched = filter.controls.some(
          (control: FilterControl) => control.isActive &&
              itemValues.includes(control.name));
      return noneSelected || matched;
    });
  }

  clearFilter(filter: Filter) {
    filter.controls.forEach((control: FilterControl) => {
      control.isActive = false;
    });
  }

  isFilterActive(filter: Filter): boolean {
    return filter.controls.some(
        (control: FilterControl) => control.isActive);
  }
}

export interface Filter {
  label: string,
  property: string,
  controls: FilterControl[];
  isShown: boolean,
}

export interface FilterControl {
  name: string,
  id: string,
  isActive: boolean,
}

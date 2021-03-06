import { Injectable } from '@angular/core';

import { BOOLEAN_STRING_STATE } from './states';
import { ProjectProps, ProjectItem, DataConfig, DataEnums } from './data-service.service';

@Injectable()
export class DataStoreService {
  localStorageEnabled = false;
  defaultLocalStorageEnabled = false;
  base: {};

  constructor() {
    this.base = {};
    if (localStorage) this.localStorageEnabled = true;
  }

  /**
   * Stores a value to the base object and localStorage.
   * @param data {@code DataStoreItem} to store.
   * @param value Value to set to the stored data.
   * @param useLocalStorage Whether to save to local storage.
   */
  // tslint:disable-next-line:no-any Local storage values are not restricted.
  setItem(
      data: string,
      value: any,
      useLocalStorage = this.defaultLocalStorageEnabled) {
    this.base[data] = value;
    if (this.localStorageEnabled && useLocalStorage) {
      localStorage.setItem(data, JSON.stringify(value));
    }
  }

  /**
   * Retrieves an data from the base object or localStorage.
   * @param data {@code DataStoreItem} from which to retrieve a value.
   * @param useLocalStorage Whether to retrieve from local storage.
   */
  // tslint:disable-next-line:no-any Local storage values are not restricted.
  getItem(
      data: string,
      useLocalStorage = this.defaultLocalStorageEnabled): any {
    const localStorageValue = (this.localStorageEnabled && useLocalStorage) ?
      JSON.parse(localStorage.getItem(data)) :
      null;
    return localStorageValue || this.base[data];
  }

  /**
   * Cleares an data from the base object and / or localStorage.
   * @param data {@code DataStoreItem} to clear.
   */
  removeItem(data: string) {
    delete this.base[data];
    if (this.localStorageEnabled) localStorage.removeItem(data);
  }

  private convertBooleanToString(state: boolean): string {
    return state ? BOOLEAN_STRING_STATE.true : BOOLEAN_STRING_STATE.false;
  }

  private convertStringToBoolean(state: string): boolean {
    return state === BOOLEAN_STRING_STATE.true ? true : false;
  }

  /**
   * Gets the current data config.
   */
  get dataConfig(): DataConfig {
    return this.getItem(DATA_PROP.dataConfig);
  }

  /**
   * Sets the current data config.
   */
  set dataConfig(data: DataConfig) {
    // console.log('dataConfig', data);

    this.setItem(DATA_PROP.dataConfig, data);
  }

  /**
   * Gets the current data enums.
   */
  get dataEnums(): DataEnums {
    return this.getItem(DATA_PROP.dataEnums);
  }

  /**
   * Sets the current data enums.
   */
  set dataEnums(data: DataEnums) {
    // console.log('dataEnums', data);
    this.setItem(DATA_PROP.dataEnums, data);
  }

  /**
   * Gets the current project properties.
   */
  get projectProps(): ProjectProps {
    return this.getItem(DATA_PROP.projectProps);
  }

  /**
   * Sets the current project properties.
   */
  set projectProps(data: ProjectProps) {
    // console.log('projectProps', data);
    this.setItem(DATA_PROP.projectProps, data);
  }

  /**
   * Gets the current projectItems.
   */
  get projectItems(): ProjectItem[] {
    return this.getItem(DATA_PROP.projectItems);
  }

  /**
   * Sets the current projectItems.
   */
  set projectItems(data: ProjectItem[]) {
    // console.log('projectItems', data);
    this.setItem(DATA_PROP.projectItems, data);
  }

  set isFiltersVisible(isVisible: boolean) {
    this.setItem(
      DATA_PROP.isFiltersVisible,
      this.convertBooleanToString(isVisible),
      true);
  }

  get isFiltersVisible(): boolean {
    const isVisible = this.getItem(DATA_PROP.isFiltersVisible, true);
    return isVisible == null ? null : this.convertStringToBoolean(isVisible);
  }
}

export const DATA_PROP: DataProp = {
  dataConfig: 'dataConfig',
  dataEnums: 'dataEnums',
  projectItems: 'projectItems',
  projectProps: 'projectProps',
  isFiltersVisible: 'isFiltersVisible',
}

export interface DataProp {
  [prop: string]: string;
}

import { Injectable } from '@angular/core';

import { BOOLEAN_STRING_STATE } from './states';

@Injectable()
export class DataStoreService {
  localStorageEnabled = false;
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
  setItem(data: string, value: any, useLocalStorage = false) {
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
  getItem(data: string, useLocalStorage = false): any {
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
}

export const DATA_PROP: DataProp = {
  projects: 'projects'
}

export interface DataProp {
  [prop: string]: string;
}

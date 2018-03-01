import { Injectable } from '@angular/core';

@Injectable()
export class UiLayoutService {
  constructor() { }
}

export interface UIDimensions {
  [name: string]: number|string;
}

export const UI_DIMENSIONS: UIDimensions = {
  wPageMaxLg: '60%',
  wPageMaxMd: '70%',
  wPageMaxSm: '590px',
}

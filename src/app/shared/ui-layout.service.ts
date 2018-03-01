import { Injectable } from '@angular/core';

@Injectable()
export class UiLayoutService {
  dimensions: UIDimensions;
  constructor() {
    this.dimensions = {
      wPageMaxLg: '60%',
      wPageMaxMd: '70%',
      wPageMaxSm: '590px',
    };
  }
}

export interface UIDimensions {
  [name: string]: number|string;
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StringMap, MODEL } from "../../../../shared/model";
import { ProjectItem } from '../../../../shared/data-service.service';

@Component({
  selector: 'jl-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent {
  readonly MODEL: StringMap = MODEL;
  @Input() projectItem: ProjectItem;
  @Output() openLink = new EventEmitter<string>();

  constructor() { }

  onOpenLink(url: string) {
    this.openLink.emit(url);
  }
}

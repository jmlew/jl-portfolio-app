import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectItem, ProjectProps } from '../../../shared/data-service.service';
import { MODEL } from "../../../shared/model";

@Component({
  selector: 'jl-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  MODEL = MODEL;
  @Input() item: ProjectItem;
  @Input() projectProps: ProjectProps;
  @Input() imgLocBase: string;
  @Output() closeDetails = new EventEmitter<void>();
  @Output() openLink = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log('item', this.item);
  }

  onClose() {
    this.closeDetails.emit();
  }

  onOpenLink(url: string) {
    this.openLink.emit(url);
  }
}

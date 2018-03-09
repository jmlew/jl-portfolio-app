import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { ProjectItem, ProjectProps } from '../../../shared/data-service.service';
import { MODEL } from "../../../shared/model";

@Component({
  selector: 'jl-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  MODEL = MODEL;
  @Input() item: ProjectItem;
  @Input() imgLocBase: string;
  @Input() projectProps: ProjectProps;
  @Output() openDetails = new EventEmitter<ProjectItem>();
  @Output() openLink = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onOpenDetails() {
    this.openDetails.emit(this.item);
  }

  onOpenLink(url: string, event: MouseEvent) {
    this.openLink.emit(url);
    event.stopPropagation();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import { UI_DIMENSIONS, NumericDimensions } from "../../../shared/ui-layout";
import { ProjectItem, ProjectProps } from '../../../shared/data-service.service';

@Component({
  selector: 'jl-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  // uiDimensions: NumericDimensions = UI_DIMENSIONS;

  @Input() item: ProjectItem;
  @Input() projectProps: ProjectProps;
  @Output() openDetails = new EventEmitter<ProjectItem>();

  constructor() { }

  ngOnInit() {
  }

  onOpenDetails() {
    this.openDetails.emit(this.item);
  }

}

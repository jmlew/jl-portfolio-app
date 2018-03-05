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

  onOpenLink(url: string) {
    this.openLink.emit(url);
  }

}

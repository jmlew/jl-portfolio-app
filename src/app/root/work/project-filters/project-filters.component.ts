import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { ProjectItem, ProjectProps } from '../../../shared/data-service.service';
import { VISIBLE_STATE, State } from "../../../shared/states";

@Component({
  selector: 'jl-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss'],
  animations: [
    trigger(
      'filtersVisible',
      [
        state('hidden', style({ height: '0' })),
        state('visible', style({ height: '*' })),
        transition('hidden => visible', animate('300ms ease-out')),
        transition('visible => hidden', animate('200ms ease-in-out'))
      ]),
  ]
})
export class ProjectFiltersComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() visibleState: string;
  @Input() projectProps: ProjectProps;
  @Input() projectItems: ProjectItem[];
  @Output() filtersChanged = new EventEmitter<void>();

  projectPropsKeys: string[];

  constructor(

  ) { }

  ngOnInit() {
    this.projectPropsKeys = Object.keys(this.projectProps);
  }

  onFiltersChanged() {
    this.filtersChanged.emit();
  }


  onVisibleChangeDone(event: AnimationEvent) {

  }
}

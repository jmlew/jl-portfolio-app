import {
  Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { ProjectItem, ProjectProps } from '../../../shared/data-service.service';
import { StringMap, MODEL } from "../../../shared/model";
import { VISIBLE_STATE, State } from "../../../shared/states";

@Component({
  selector: 'jl-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  animations: [
    trigger(
      'panelVisible',
      [
        state('hidden', style({ height: '0' })),
        state('visible', style({ height: '*' })),
        transition('hidden => visible', animate('300ms ease-out')),
        transition('visible => hidden', animate('200ms ease-in-out'))
      ]),
    trigger(
      'bgVisible',
      [
        state('hidden', style({ opacity: 0 })),
        state('visible', style({ opacity: .7 })),
        transition('hidden => visible', animate('300ms ease-in-out')),
        transition('visible => hidden', animate('300ms ease-in-out'))
      ])]
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {
  readonly MODEL: StringMap = MODEL;
  panelVisibleState: string = VISIBLE_STATE.hidden;

  @Input() item: ProjectItem;
  @Input() projectProps: ProjectProps;
  @Input() imgLocBase: string;
  @Output() closeDetails = new EventEmitter<void>();
  @Output() openLink = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.panelVisibleState = VISIBLE_STATE.visible;
    }, 100);
  }

  onClose() {
    this.panelVisibleState = VISIBLE_STATE.hidden;
    setTimeout(() => {
      this.closeDetails.emit();
    }, 300);
  }

  onOpenLink(url: string) {
    this.openLink.emit(url);
  }
}

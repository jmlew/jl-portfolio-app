import {
  Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
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
  panelIsExpanded = false;
  @Input() projectItemIndex: number;
  @Input() projectItemsLength: number;
  @Input() projectItem: ProjectItem;
  @Input() projectProps: ProjectProps;
  @Input() imgLocBase: string;
  @Output() close = new EventEmitter<void>();
  @Output() openLink = new EventEmitter<string>();
  @Output() selectProject = new EventEmitter<number>();
  private readonly keyboardShortcuts = {
    ArrowRight: this.onProjectNext,
    ArrowLeft: this.onProjectPrev,
    Escape: this.onClose,
  };

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.panelVisibleState = VISIBLE_STATE.visible;
    }, 100);
  }

  onClose() {
    this.panelVisibleState = VISIBLE_STATE.hidden;
    setTimeout(() => {
      this.close.emit();
    }, 300);
  }

  onProjectNext() {
    const currentItem = this.projectItemIndex >= this.projectItemsLength - 1 ?
      0 : this.projectItemIndex + 1;
    this.selectProject.emit(currentItem);
  }

  onProjectPrev() {
    const currentItem = this.projectItemIndex <= 0 ?
      this.projectItemsLength - 1 : this.projectItemIndex - 1;
    this.selectProject.emit(currentItem);
  }

  onOpenLink(url: string) {
    this.openLink.emit(url);
  }

  onPanelVisibleDone(event: AnimationEvent) {
  }

  @HostListener('window:keydown', ['$event']) onKeyDown($event) {
    const method = this.keyboardShortcuts[$event.key];
    if (method) method.call(this);
  }
}

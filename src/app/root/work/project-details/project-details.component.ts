import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jl-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Output() closeDetails = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeDetails.emit();
  }

}

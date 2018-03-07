import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jl-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  @Input() label: string;
  @Input() isActive: boolean;
  @Output() activate = new EventEmitter<void>();

  constructor() { }

  onClick() {
    this.activate.emit();
  }

  ngOnInit() {
    console.log('this.label', this.label);

  }

}

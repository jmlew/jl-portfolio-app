import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";

@Component({
  // selector: 'jl-work', // Provided via router.
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(private readonly routesService: RoutesService) { }

  ngOnInit() {
  }

}

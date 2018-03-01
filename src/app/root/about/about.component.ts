import { Component, OnInit } from '@angular/core';

import { RoutesService } from "../../shared/routes.service";

@Component({
  selector: 'jl-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private readonly routesService: RoutesService) {

  }

  ngOnInit() {
  }

}

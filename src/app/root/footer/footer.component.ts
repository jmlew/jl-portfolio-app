import { Component } from '@angular/core';

@Component({
  selector: 'jl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor() { }

  onOpenSource() {
    const gitHubUrl = 'https://github.com/jmlew/jl-portfolio-app';
    window.open(gitHubUrl, '_blank');
  }
}


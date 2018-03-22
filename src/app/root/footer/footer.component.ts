import { Component } from '@angular/core';

@Component({
  selector: 'jl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor() { }

  onOpenUrl(url: string) {
    window.open(url, '_blank');
  }
}


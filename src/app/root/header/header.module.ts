import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [ HeaderComponent ],
  declarations: [ HeaderComponent ],
})
export class HeaderModule { }

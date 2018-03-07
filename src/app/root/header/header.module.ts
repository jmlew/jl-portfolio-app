import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeaderComponent } from './header.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [ HeaderComponent ],
  declarations: [ HeaderComponent, MenuButtonComponent ],
})
export class HeaderModule { }

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [ HeaderComponent ],
  declarations: [ HeaderComponent ],
})
export class HeaderModule { }

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule,
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }

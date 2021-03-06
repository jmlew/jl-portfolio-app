import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ContentWrapperModule } from "../content-wrapper/content-wrapper.module";
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ContentWrapperModule,
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }

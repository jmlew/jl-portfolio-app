import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ContentWrapperComponent } from './content-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [ContentWrapperComponent],
  exports: [ContentWrapperComponent],
})
export class ContentWrapperModule { }

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ],
  imports: [FlexLayoutModule ],
})
export class HeaderModule { }

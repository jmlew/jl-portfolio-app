import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WorkComponent } from "./work/work.component";
import { AboutComponent } from "./about/about.component";

const rootRoutes: Routes = [
  {
    path: 'work',
    component: WorkComponent,
  },
  {
    path: 'work/:id',
    component: WorkComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      rootRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class RootRoutingModule { }

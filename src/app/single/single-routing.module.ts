import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinglePage } from './single.page';

const routes: Routes = [
  {
    path: '',
    component: SinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglePageRoutingModule {}

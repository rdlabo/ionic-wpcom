import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagePage } from './page.page';

const routes: Routes = [
  {
    path: '',
    component: PagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagePageRoutingModule {}

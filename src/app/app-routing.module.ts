import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'archive',
    pathMatch: 'full',
  },
  {
    path: 'archive',
    loadChildren: () =>
      import('./archive/archive.module').then((m) => m.ArchivePageModule),
  },
  {
    path: 'archive/single/:postID',
    loadChildren: () =>
      import('./single/single.module').then((m) => m.SinglePageModule),
  },
  {
    path: 'page/:postID',
    loadChildren: () =>
      import('./page/page.module').then((m) => m.PagePageModule),
  },
  {
    // path: "category",
    path: 'category/:categorySlug',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlePage),
    PipesModule
  ],
  exports: [
    ArticlePage
  ]
})
export class ArticlePageModule {}

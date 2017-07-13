import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page } from './page';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    Page,
  ],
  imports: [
    IonicPageModule.forChild(Page),
    PipesModule
  ],
  exports: [
    Page
  ]
})
export class PageModule {}

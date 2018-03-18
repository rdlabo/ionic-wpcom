import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page } from './page';
import { PipesModule } from '../../pipes/pipes.module'
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    Page,
  ],
  imports: [
    IonicPageModule.forChild(Page),
    PipesModule,
      ComponentsModule
  ],
  exports: [
    Page
  ]
})
export class PageModule {}

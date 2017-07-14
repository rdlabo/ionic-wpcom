import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page } from './page';
import { PipesModule } from '../../pipes/pipes.module'
import { FooterComponentModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    Page,
  ],
  imports: [
    IonicPageModule.forChild(Page),
    PipesModule,
    FooterComponentModule
  ],
  exports: [
    Page
  ]
})
export class PageModule {}

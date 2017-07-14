import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Single } from './single';
import { PipesModule } from '../../pipes/pipes.module'
import { FooterComponentModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    Single,
  ],
  imports: [
    IonicPageModule.forChild(Single),
    PipesModule,
    FooterComponentModule
  ],
  exports: [
    Single
  ]
})
export class SingleModule {}

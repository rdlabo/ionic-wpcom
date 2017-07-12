import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Single } from './single';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    Single,
  ],
  imports: [
    IonicPageModule.forChild(Single),
    PipesModule
  ],
  exports: [
    Single
  ]
})
export class SingleModule {}

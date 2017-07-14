import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FooterComponent } from './footer';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterComponentModule {}

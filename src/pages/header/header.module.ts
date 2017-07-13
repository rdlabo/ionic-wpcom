import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderComponentModule {}

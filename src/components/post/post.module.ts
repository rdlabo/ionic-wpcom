import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PostComponent } from './post';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    PostComponent,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    PostComponent
  ]
})
export class PostComponentModule {}

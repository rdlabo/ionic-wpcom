import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PostsComponent } from './posts';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    PostsComponent,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    PostsComponent
  ]
})
export class PostsComponentModule {}

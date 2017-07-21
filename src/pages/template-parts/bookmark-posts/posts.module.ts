import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BookmarkPostsComponent } from './posts';
import { PipesModule } from '../../../pipes/pipes.module'

@NgModule({
  declarations: [
      BookmarkPostsComponent,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
      BookmarkPostsComponent
  ]
})
export class BookmarkPostsComponentModule {}

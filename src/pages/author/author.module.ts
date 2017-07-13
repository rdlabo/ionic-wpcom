import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Author } from './author';

import { PostsComponentModule } from '../../components/posts/posts.module';

@NgModule({
  declarations: [
    Author,
  ],
  imports: [
    IonicPageModule.forChild(Author),
    PostsComponentModule
  ],
  exports: [
    Author
  ]
})
export class AuthorModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tag } from './tag';

import { PostsComponentModule } from '../../components/posts/posts.module';

@NgModule({
  declarations: [
    Tag,
  ],
  imports: [
    IonicPageModule.forChild(Tag),
    PostsComponentModule
  ],
  exports: [
    Tag
  ]
})
export class TagModule {}

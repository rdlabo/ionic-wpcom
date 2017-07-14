import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tag } from './tag';
import { PostsComponentModule } from '../template-parts/posts/posts.module';
import { FooterComponentModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    Tag,
  ],
  imports: [
    IonicPageModule.forChild(Tag),
    PostsComponentModule,
    FooterComponentModule
  ],
  exports: [
    Tag
  ]
})
export class TagModule {}

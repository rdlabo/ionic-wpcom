import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Archive } from './archive';
import { PostsComponentModule } from '../template-parts/posts/posts.module';

@NgModule({
  declarations: [
    Archive,
  ],
  imports: [
    IonicPageModule.forChild(Archive),
    PostsComponentModule
  ],
  exports: [
    Archive,
  ]
})
export class ArchiveModule {}

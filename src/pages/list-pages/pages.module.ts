import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPages } from './pages';

import { PostsComponentModule } from '../../components/posts/posts.module';

@NgModule({
  declarations: [
    ListPages,
  ],
  imports: [
    IonicPageModule.forChild(ListPages),
    PostsComponentModule
  ],
  exports: [
    ListPages
  ]
})
export class ListPagesModule {}

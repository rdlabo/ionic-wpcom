import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Bookmark } from './bookmark';
import { BookmarkPostsComponentModule } from '../template-parts/bookmark-posts/posts.module';
import { FooterComponentModule } from '../footer/footer.module';

@NgModule({
  declarations: [
      Bookmark,
  ],
  imports: [
    IonicPageModule.forChild(Bookmark),
      BookmarkPostsComponentModule,
      FooterComponentModule
  ],
  exports: [
      Bookmark,
  ]
})
export class BookmarkModule {}

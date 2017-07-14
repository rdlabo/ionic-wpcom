import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Category } from './category';
import { PostsComponentModule } from '../template-parts/posts/posts.module';
import { FooterComponentModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    Category,
  ],
  imports: [
    IonicPageModule.forChild(Category),
    PostsComponentModule,
    FooterComponentModule
  ],
  exports: [
    Category
  ]
})
export class CategoryModule {}

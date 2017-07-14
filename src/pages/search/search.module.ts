import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Search } from './search';
import { PostsComponentModule } from '../template-parts/posts/posts.module';
import { FooterComponentModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    Search,
  ],
  imports: [
    IonicPageModule.forChild(Search),
    PostsComponentModule,
    FooterComponentModule
  ],
  exports: [
    Search,
  ]
})
export class ArchiveModule {}

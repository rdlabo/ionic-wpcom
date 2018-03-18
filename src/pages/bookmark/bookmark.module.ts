import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Bookmark } from './bookmark';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
      Bookmark,
  ],
  imports: [
    IonicPageModule.forChild(Bookmark),
      ComponentsModule
  ],
  exports: [
      Bookmark,
  ]
})
export class BookmarkModule {}

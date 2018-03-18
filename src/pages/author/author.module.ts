import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Author } from './author';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    Author,
  ],
  imports: [
    IonicPageModule.forChild(Author),
      ComponentsModule
  ],
  exports: [
    Author
  ]
})
export class AuthorModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { PostComponentModule } from '../../components/post/post.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PostComponentModule
  ],
  exports: [
    HomePage,
  ]
})
export class HomeModule {}

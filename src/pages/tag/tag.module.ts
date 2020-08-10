import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tag } from './tag';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [Tag],
  imports: [IonicPageModule.forChild(Tag), ComponentsModule],
  exports: [Tag],
})
export class TagModule {}

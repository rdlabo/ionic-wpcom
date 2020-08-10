import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Category } from './category';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [Category],
  imports: [IonicPageModule.forChild(Category), ComponentsModule],
  exports: [Category],
})
export class CategoryModule {}

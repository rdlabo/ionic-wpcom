import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../_shared/shared.module';
import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryPage } from './category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CategoryPageRoutingModule,
  ],
  declarations: [CategoryPage],
})
export class CategoryPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagePageRoutingModule } from './page-routing.module';

import { PagePage } from './page.page';

import { SharedModule } from "../_shared/shared.module";
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    PagePageRoutingModule
  ],
  declarations: [PagePage]
})
export class PagePageModule {}

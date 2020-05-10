import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePageRoutingModule } from './single-routing.module';
import { SharedModule } from "../_shared/shared.module";
import { SinglePage } from './single.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    SinglePageRoutingModule
  ],
  declarations: [SinglePage]
})
export class SinglePageModule {}

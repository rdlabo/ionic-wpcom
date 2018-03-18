import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Archive } from './archive';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [
    Archive,
  ],
  imports: [
    IonicPageModule.forChild(Archive),
    ComponentsModule
  ],
  exports: [
    Archive,
  ]
})
export class ArchiveModule {}

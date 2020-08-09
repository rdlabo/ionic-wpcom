import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../_shared/shared.module';
import { ArchivePageRoutingModule } from './archive-routing.module';

import { ArchivePage } from './archive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ArchivePageRoutingModule,
  ],
  declarations: [ArchivePage],
})
export class ArchivePageModule {}

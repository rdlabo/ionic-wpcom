import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SidebarComponent } from './sidebar';

@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarComponentModule {}

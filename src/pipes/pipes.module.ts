import { NgModule } from '@angular/core';
import { FileserverPipe } from './fileserver/fileserver';
import { MydatePipe } from './mydate/mydate';
import { KeyPipe } from './key/key';

@NgModule({
  declarations: [
    FileserverPipe,
    MydatePipe,
    KeyPipe
  ],
  exports: [
    FileserverPipe,
    MydatePipe,
    KeyPipe
  ]
})
export class PipesModule {}

import { NgModule } from '@angular/core';
import { MydatePipe } from './mydate/mydate';
import { KeyPipe } from './key/key';

@NgModule({
  declarations: [
    MydatePipe,
    KeyPipe
  ],
  exports: [
    MydatePipe,
    KeyPipe
  ]
})
export class PipesModule {}

import { NgModule } from '@angular/core';
import { KeyPipe } from './key/key';
import { MydatePipe } from './mydate/mydate';

@NgModule({
  declarations: [MydatePipe, KeyPipe],
  exports: [MydatePipe, KeyPipe],
})
export class PipesModule {}

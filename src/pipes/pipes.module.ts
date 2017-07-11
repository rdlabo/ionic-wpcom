import { NgModule } from '@angular/core';
import { FileserverPipe } from './fileserver/fileserver';
import { DatePipe } from './date/date';

@NgModule({
  declarations: [
    FileserverPipe,
    DatePipe
  ],
  exports: [
    FileserverPipe,
    DatePipe
  ]
})
export class PipesModule {}

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FileserverPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'fileserver',
})
export class FileserverPipe implements PipeTransform {
  transform(value: string) {
    return value.replace( /ja\.blog/g , "ja-blog" ) ;
  }
}

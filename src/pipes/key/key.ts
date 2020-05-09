import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'key',
})
export class KeyPipe implements PipeTransform {
  transform(value, args: string[]) {
    const keys = [];
    for (const key of value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}

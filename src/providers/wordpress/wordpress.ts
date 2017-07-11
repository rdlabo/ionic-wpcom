import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressProvider {

  constructor(
      public http: Http
  ) {}

}

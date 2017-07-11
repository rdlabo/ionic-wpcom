import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { wordpressURL } from '../../config/wordpress';

@Injectable()
export class WordpressProvider {

  constructor(
      public http: Http
  ) {}

  getPostList()
  {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/")
        .map(res => res.json().posts);
  }
}

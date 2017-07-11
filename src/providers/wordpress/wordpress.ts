import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { wordpressURL, InterfacePost } from '../../config/wordpress';

@Injectable()
export class WordpressProvider {

  constructor(
      public http: Http
  ) {}

  getPostList(page:number)
  {
    let params = new URLSearchParams();
    params.set('page', String(page));

    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/",
        { search:params })
        .map(res => {
          let returnData:Array<InterfacePost> = [];
          let i:number = 0;
          res.json().posts.forEach((val:InterfacePost) => {
            returnData[i] = ((params) => {
              if(params.post_thumbnail == null){
                params.post_thumbnail = {
                  URL : 'https://s.w.org/about/images/logos/wordpress-logo-notext-rgb.png'
                }
              }
              return params;
            })(val);
            i++;
          });
          return returnData;
        });
  }
}

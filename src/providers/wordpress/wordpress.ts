import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { wordpressURL, dummyImageURL } from '../../wp_config';
import { InterfacePost } from '../../interface/wordpress';

@Injectable()
export class WordpressProvider {

  constructor(
      public http: Http
  ) {}

  getPostList(page:number)
  {
    let params = new URLSearchParams();
    params.set('page', String(page));
      params.set('fields', 'ID, content, date, excerpt, post_thumbnail, title, categories, tags');

    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/",
        { search:params })
        .map(
            res => this.setThumbnail(res.json().posts)
        );
  }

    getPostArticle(pageID:number)
    {
        let params = new URLSearchParams();
        params.set('fields','ID, content, date, excerpt, post_thumbnail, title, categories, author');

        return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/" + pageID,
            { search:params })
            .map(
                res => this.setThumbnail(res.json().posts)
            );
    }

    private setThumbnail(params:Array<InterfacePost>){

        let returnData:Array<InterfacePost> = [];
        let i:number = 0;
        params.forEach((val:InterfacePost) => {
            returnData[i] = ((params) => {
                if(params.post_thumbnail == null){
                    params.post_thumbnail = {
                        URL : dummyImageURL
                    }
                }
                return params;
            })(val);
            i++;
        });
        return returnData;
    }
}

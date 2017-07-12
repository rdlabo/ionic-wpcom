import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { wordpressURL, dummyImageURL } from '../../wp_config';
import { InterfacePost } from '../../interface/wordpress';

@Injectable()
export class WordpressProvider {

  constructor(
      public http: Http,
      public sanitizer: DomSanitizer
  ) {}

  getPostList(page:number) {
    let params = new URLSearchParams();
    params.set('page', String(page));
      params.set('fields', 'ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');

    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/",
        { search:params })
        .map(
            res => this.loopPosts(res.json().posts)
        );
  }

    getPostArticle(pageID:number) {
        let params = new URLSearchParams();
        params.set('fields','ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');

        return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/" + pageID,
            { search:params })
            .map(
                res => this.createArticle(res.json())
            );
    }

    private loopPosts(params:Array<InterfacePost>){
        let returnData:Array<InterfacePost> = [];
        params.forEach((val:InterfacePost) => {
            returnData.push(this.createArticle(val));
        });
        return returnData;
    }

    private createArticle(params:InterfacePost){
        if(params.post_thumbnail == null){
            params.post_thumbnail = {
                URL : dummyImageURL
            }
        }
        params.content = <string>this.sanitizer.bypassSecurityTrustHtml(params.content);
        return params;
    }
}

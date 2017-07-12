import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { wordpressURL, dummyImageURL } from '../../wp-config';
import { InterfacePost, InterfaceCategory,InterfacePostParams } from '../../interface/wordpress';

@Injectable()
export class WordpressProvider {

    constructor(
        public http: Http,
        public sanitizer: DomSanitizer
    ) {}

    getPostList(page:number, search:InterfacePostParams) {
        let params = new URLSearchParams();
        params.set('page', String(page));
        params.set('fields', 'ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');

        params.set('type', search.type);
        if(search.slug){
            params.set('category', search.slug);
        }

        return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts",
            { search:params })
            .map(
                res => <Array<InterfacePost>>this.loopPosts(res.json().posts)
            );
    }

    getPostArticle(pageID:number) {
        let params = new URLSearchParams();
        params.set('fields','ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');

        return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/posts/" + pageID,
            { search:params })
            .map(
                res => <InterfacePost>this.createArticle(res.json())
            );
    }

    getCategoryList(){
        return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/categories")
            .map(
                res => <Array<InterfaceCategory>>res.json().categories
            );
    }

    getCategory(slug:string){
        return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/' + wordpressURL + "/categories/slug:" + slug)
            .map(
                res => <InterfaceCategory>res.json()
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
        params.title = <string>this.sanitizer.bypassSecurityTrustHtml(params.title);
        params.content = <string>this.sanitizer.bypassSecurityTrustHtml(params.content);
        params.excerpt = <string>this.sanitizer.bypassSecurityTrustHtml(this.removeTag(params.excerpt));
        if(params.excerpt.length > 80){
            params.excerpt = params.excerpt.substr(0, 80) + '…';
        }

        return params;
    }

    private removeTag(str, arrowTag = null)
    {
        if ((Array.isArray ?
                Array.isArray(arrowTag)
                : Object.prototype.toString.call(arrowTag) === '[object Array]')
        ) {
            arrowTag = arrowTag.join('|');
        }

        arrowTag = arrowTag ? arrowTag : '';
        let pattern = new RegExp('(?!<\\/?(' + arrowTag + ')(>|\\s[^>]*>))<("[^"]*"|\\\'[^\\\']*\\\'|[^\\\'">])*>', 'gim');

        str = str.replace(pattern, '');
        return str.replace(/\s+/g, "");
    }
}

import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { wordpressAPI, wordpressURL, noImageURL } from '../../wp-config';
import {
    InterfacePost, InterfaceCategory, InterfacePostParams, InterfaceTag,
    InterfaceAuthor
} from '../../interface/wordpress';

@Injectable()
export class WordpressProvider {

    constructor(
        public http: Http,
        public sanitizer: DomSanitizer
    ) {}

    getPostList(page:number, search:InterfacePostParams) {
        let params = new URLSearchParams();
        params.set('page', String(page));
        params.set('number',String(12));
        // params.set('fields', 'ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');
        params.set('fields', 'ID, date, excerpt, post_thumbnail, title');

        params.set('type', search.type);

        if(search.categorySlug){
            params.set('category', search.categorySlug);
        }

        if(search.tagSlug){
            params.set('tag', search.tagSlug);
        }

        if(search.authorID){
            params.set('author', String(search.authorID));
        }

        if(search.search){
            params.set('search', search.search);
        }

        return this.http.get(wordpressAPI + wordpressURL + "/posts",
            { search:params })
            .map(
                res => <Array<InterfacePost>>this.loopPosts(res.json().posts)
            );
    }

    getPostArticle(pageID:number) {
        let params = new URLSearchParams();
        params.set('fields','ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');

        return this.http.get(wordpressAPI + wordpressURL + "/posts/" + pageID,
            { search:params })
            .map(
                res => <InterfacePost>this.createArticle(res.json())
            );
    }

    getCategoryList(){
        return this.http.get(wordpressAPI + wordpressURL + "/categories")
            .map(
                res => <Array<InterfaceCategory>>res.json().categories
            );
    }

    getCategory(key:string){
        return this.http.get(wordpressAPI + wordpressURL + "/categories/slug:" + key)
            .map(
                res => <InterfaceCategory>res.json()
            );
    }

    getTag(key:string){
        return this.http.get(wordpressAPI + wordpressURL + "/tags/slug:" + key)
            .map(
                res => <InterfaceTag>res.json()
            );
    }

    getAuthorList(key:string){
        let params = new URLSearchParams();
        params.set('search', key);
        return this.http.get(wordpressAPI + wordpressURL + "/users")
            .map(
                res => <Array<InterfaceAuthor>>res.json()
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
                URL : noImageURL
            }
        }

        params.origin = {
            title : params.title,
            excerpt: params.excerpt
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

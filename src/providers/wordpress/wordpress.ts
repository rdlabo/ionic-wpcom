import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { wordpressAPI, wordpressURL, noImageURL } from '../../wp-config';
import {
    InterfacePost, InterfaceCategory, InterfacePostParams, InterfaceTag,
    InterfaceAuthor, InterfaceSite
} from '../../interface/wordpress';
import {Observable} from "rxjs/Observable";

@Injectable()
export class WordpressProvider {

    constructor(
        public http: HttpClient,
        public sanitizer: DomSanitizer,
        public alertCtrl: AlertController,
    ) {}

    errorResponse(error) : void{
        let errorTitle, errorText : string;
        switch (error.status) {
            case 401:
                errorTitle = '401 Unauthorized';
                errorText = 'アクセスが禁止されています。WordPress.comの公開範囲か、JetPackでのRestAPIの許可を確認してください';
                break;
            case 404:
                errorTitle = '404 Not Found';
                errorText = 'URLが間違っています。WordPress.comのURLか、JetPackの連携を確認してください';
                break;
            case 500:
                errorTitle = '500 Internal Server Error';
                errorText = 'アクセスができませんでした。インターネットへの接続を確認してください。';
                break;
            case 503:
                errorTitle = '503 Service Unavailable';
                errorText = 'サーバにアクセスが集中しているためアクセスができませんでした。しばらく時間を置いてから再アクセス下さい。';
                break;
            default:
                errorTitle = 'Server Error';
                errorText = 'アクセスができませんでした。'+ error.status +'番のエラーです。';
                break;
        }

        let alert = this.alertCtrl.create({
            title: errorTitle,
            message: errorText,
            buttons: ['閉じる']
        });
        alert.present();
    }

    getSiteInfo() : Observable<InterfaceSite> {
        let params = new HttpParams();
        params = params.append('fields', 'name, jetpack');
        return this.http.get<
            InterfaceSite
            >(wordpressAPI + wordpressURL, { params:params });
    }

    getPostList(page:number, search:InterfacePostParams): Observable<any>  {
        let params = new HttpParams();
        params = params.append('page', String(page));
        params = params.append('number',String(10));
        params = params.append('fields', 'ID, date, excerpt, post_thumbnail, title, author');
        params = params.append('type', search.type);

        if(search.categorySlug)params = params.append('category', search.categorySlug);
        if(search.tagSlug)params = params.append('tag', search.tagSlug);
        if(search.authorID) params = params.append('author', String(search.authorID));
        if(search.search) params = params.append('search', search.search);

        return this.http.get<{
            posts:InterfacePost[]
        }>(wordpressAPI + wordpressURL + "/posts", { params:params })
            .map( res => this.loopPosts(res.posts));
    }

    getPostArticle(pageID:number): Observable<any> {
        let params = new HttpParams();
        params = params.append('fields','ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags');

        return this.http.get<
            InterfacePost
            >(wordpressAPI + wordpressURL + "/posts/" + pageID, { params:params })
            .map(res => this.createArticle(res));
    }

    getCategoryList(): Observable<InterfaceCategory[]>{
        return this.http.get<{
            categories: InterfaceCategory[]
        }>(wordpressAPI + wordpressURL + "/categories")
            .map(res => res.categories);
    }

    getCategory(key:string): Observable<InterfaceCategory>{
        return this.http.get<
            InterfaceCategory
            >(wordpressAPI + wordpressURL + "/categories/slug:" + key);
    }

    getTag(key:string): Observable<InterfaceTag>{
        return this.http.get<
            InterfaceTag
            >(wordpressAPI + wordpressURL + "/tags/slug:" + key);
    }

    getAuthorList(key:string): Observable<InterfaceAuthor[]>{
        let params = new HttpParams();
        params = params.append('search', key);

        return this.http.get<
            InterfaceAuthor[]
            >(wordpressAPI + wordpressURL + "/users");
    }

    private loopPosts(params:Array<InterfacePost>): any{
        let returnData:Array<InterfacePost> = [];
        params.forEach((val:InterfacePost) => {
            returnData.push(this.createArticle(val));
        });
        return returnData;
    }

    private createArticle(params:InterfacePost) : any {

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

        if(params.excerpt.length > 80){
            params.excerpt = params.excerpt.substr(0, 80);
            params.excerpt = <string>this.sanitizer.bypassSecurityTrustHtml(params.excerpt);
        }else{
            params.excerpt = <string>this.sanitizer.bypassSecurityTrustHtml(this.removeTag(params.excerpt));
        }

        return params;
    }

    private removeTag(str: string, arrowTag = null) : string {
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


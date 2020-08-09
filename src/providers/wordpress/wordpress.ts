import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  IAuthor,
  ICategory,
  IPost,
  IPostParams,
  ISite,
  ITag,
} from '../../interfaces/wordpress';

@Injectable({
  providedIn: 'root',
})
export class WordpressProvider {
  constructor(
    public http: HttpClient,
    public sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
  ) {}

  public errorResponse(error): void {
    let errorTitle: string;
    let errorText: string;
    switch (error.status) {
      case 401:
        errorTitle = '401 Unauthorized';
        errorText =
          'アクセスが禁止されています。WordPress.comの公開範囲か、JetPackでのRestAPIの許可を確認してください';
        break;
      case 404:
        errorTitle = '404 Not Found';
        errorText =
          'URLが間違っています。WordPress.comのURLか、JetPackの連携を確認してください';
        break;
      case 500:
        errorTitle = '500 Internal Server Error';
        errorText =
          'アクセスができませんでした。インターネットへの接続を確認してください。';
        break;
      case 503:
        errorTitle = '503 Service Unavailable';
        errorText =
          'サーバにアクセスが集中しているためアクセスができませんでした。しばらく時間を置いてから再アクセス下さい。';
        break;
      default:
        errorTitle = 'Server Error';
        errorText =
          'アクセスができませんでした。' + error.status + '番のエラーです。';
        break;
    }

    // const alert = this.alertCtrl.create({
    //   title: errorTitle,
    //   message: errorText,
    //   buttons: ['閉じる'],
    // });
    // alert.present();
  }

  public getSiteInfo(): Observable<ISite> {
    let params = new HttpParams();
    params = params.append('fields', 'name, jetpack');
    return this.http.get<ISite>(
      environment.wordpressAPI + environment.wordpressURL,
      { params },
    );
  }

  public getPostList(page: number, search: IPostParams): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('number', String(10));
    params = params.append(
      'fields',
      'ID, date, excerpt, post_thumbnail, title, author',
    );
    params = params.append('type', search.type);

    if (search.categorySlug) {
      params = params.append('category', search.categorySlug);
    }
    if (search.tagSlug) {
      params = params.append('tag', search.tagSlug);
    }
    if (search.authorID) {
      params = params.append('author', String(search.authorID));
    }
    if (search.search) {
      params = params.append('search', search.search);
    }

    // console.log(params);
    return this.http
      .get<{
        posts: IPost[];
      }>(environment.wordpressAPI + environment.wordpressURL + '/posts', {
        params,
      })
      .pipe(map((res) => this.loopPosts(res.posts)));
  }

  public getPostArticle(pageID: number): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'fields',
      'ID, content, date, excerpt, post_thumbnail, title, categories, short_URL, author, tags',
    );

    return this.http
      .get<IPost>(
        environment.wordpressAPI +
          environment.wordpressURL +
          '/posts/' +
          pageID,
        { params },
      )
      .pipe(map((res) => this.createArticle(res)));
  }

  public getCategoryList(): Observable<ICategory[]> {
    return this.http
      .get<{
        categories: ICategory[];
      }>(environment.wordpressAPI + environment.wordpressURL + '/categories')
      .pipe(map((res) => res.categories));
  }

  public getCategory(key: string): Observable<ICategory> {
    return this.http.get<ICategory>(
      environment.wordpressAPI +
        environment.wordpressURL +
        '/categories/slug:' +
        key,
    );
  }

  public getTag(key: string): Observable<ITag> {
    return this.http.get<ITag>(
      environment.wordpressAPI + environment.wordpressURL + '/tags/slug:' + key,
    );
  }

  public getAuthorList(key: string): Observable<IAuthor[]> {
    let params = new HttpParams();
    params = params.append('search', key);

    return this.http.get<IAuthor[]>(
      environment.wordpressAPI + environment.wordpressURL + '/users',
    );
  }

  private loopPosts(params: Array<IPost>): any {
    const returnData: Array<IPost> = [];
    params.forEach((val: IPost) => {
      returnData.push(this.createArticle(val));
    });
    return returnData;
  }

  private createArticle(params: IPost): any {
    if (params.post_thumbnail == null) {
      params.post_thumbnail = {
        URL: environment.noImageURL,
      };
    }

    params.origin = {
      title: params.title,
      excerpt: params.excerpt,
    };
    params.title = this.sanitizer.bypassSecurityTrustHtml(params.title) as string;
    params.content = (
      this.sanitizer.bypassSecurityTrustHtml(params.content)
    ) as string;

    if (params.excerpt.length > 80) {
      params.excerpt = params.excerpt.substr(0, 80);
      params.excerpt = (
        this.sanitizer.bypassSecurityTrustHtml(params.excerpt)
      ) as string;
    } else {
      params.excerpt = (
        this.sanitizer.bypassSecurityTrustHtml(this.removeTag(params.excerpt))
      ) as string;
    }

    return params;
  }

  private removeTag(str: string, arrowTag = null): string {
    if (
      Array.isArray
        ? Array.isArray(arrowTag)
        : Object.prototype.toString.call(arrowTag) === '[object Array]'
    ) {
      arrowTag = arrowTag.join('|');
    }

    arrowTag = arrowTag ? arrowTag : '';
    const pattern = new RegExp(
      '(?!<\\/?(' +
        arrowTag +
        ')(>|\\s[^>]*>))<("[^"]*"|\\\'[^\\\']*\\\'|[^\\\'">])*>',
      'gim',
    );

    str = str.replace(pattern, '');
    return str.replace(/\s+/g, '');
  }
}

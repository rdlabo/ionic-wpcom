import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IPost, IStragePost } from '@/interfaces/wordpress';
import { environment } from '@app/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'bookmark-posts',
  templateUrl: 'posts.html',
})
export class BookmarkPostsComponent implements OnInit {
  constructor(public nav: NavController, public sanitizer: DomSanitizer, public storage: Storage) {}

  page: number = 1;
  posts: Array<IPost> = [];
  Loaded;

  ngOnInit() {
    this.getPostList().then(
      (data: Array<IPost>) => {
        console.log(data);
        this.page++;
        this.posts = this.posts.concat(data);
      },
      error => {
        this.posts = [];
      },
    );
  }
  //
  // doInfinite(infiniteScroll) {
  //     this.getPostList().then(
  //         (data:Array<InterfacePost>) => {
  //             this.page++;
  //             this.posts = this.posts.concat(data);
  //             if(data.length > 0) {
  //                 infiniteScroll.complete();
  //             }else{
  //                 infiniteScroll.enable(false);
  //             }
  //         },
  //         error => {
  //             infiniteScroll.complete();
  //         }
  //     );
  // }

  viewSingle(post): void {
    this.nav.push('Single', { postID: post.ID, title: post.title });
  }

  private getPostList() {
    return new Promise((resolve, reject) => {
      this.storage.get('bookmarks').then(data => {
        if (data) {
          const bookmarks: Array<IStragePost> = JSON.parse(data);
          const bookmarkArticles: Array<IPost> = [];
          console.log(bookmarks);
          Array.prototype.forEach.call(bookmarks, node => {
            if (node.article && node.domain === environment.wordpressURL) {
              node.article.title = this.sanitizer.bypassSecurityTrustHtml(node.article.origin.title);
              node.article.excerpt = this.sanitizer.bypassSecurityTrustHtml(node.article.origin.excerpt);
              bookmarkArticles.push(node.article);
            }
          });
          this.Loaded = true;
          resolve(bookmarkArticles);
        } else {
          this.Loaded = true;
          resolve([]);
        }
      });
    });
  }
}

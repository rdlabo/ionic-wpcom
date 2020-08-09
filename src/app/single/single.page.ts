import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertController, NavController, NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { IAuthor, ICategory, IPost, IStragePost, ITag } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    // public navParams: NavParams,
    public router: Router,
    public route: ActivatedRoute,
    public storage: Storage,
    public wp: WordpressProvider,
    public toastCtrl: ToastController,
  ) {
  }

  public title: string;
  public article: IPost;
  public url: string = window.location.href;
  public shareURL: {
    twitter: string;
  };
  public noImageURL: string = environment.noImageURL;
  public bookmarked = false;

  public ngOnInit() {

  }

  public ionViewWillEnter() {
    this.wp.getPostArticle(Number(this.route.snapshot.paramMap.get('postID'))).subscribe((data) => {
      this.title = !this.title ? data.title : this.title;
      this.article = data;
      this.shareURL = this.createShareURL(location.href, data);
      setTimeout(() => {
        this.trimArticle();
      }, 100);
      this.checkBookmarked();
    });
  }

  public viewAuthor(author: IAuthor): void {
    // this.navCtrl.setRoot('Author', { title: author.name, key: author.ID });
    // this.navCtrl.navigateRoot('Author', { title: author.name, key: author.ID });
  }

  public viewCategory(category: ICategory): void {
    // this.navCtrl.setRoot('Category', { title: category.name, key: category.slug });
    // this.navCtrl.navigateRoot('Category', { title: category.name, key: category.slug });
  }

  public viewTag(tag: ITag): void {
    // this.navCtrl.setRoot('Tag', { title: tag.name, key: tag.slug });
    // this.navCtrl.navigateRoot('Tag', { title: tag.name, key: tag.slug });
  }

  public async addClipboard(): Promise<void> {
    const body = document.body;
    const textArea = document.createElement('textarea');
    textArea.value = location.href;
    body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    body.removeChild(textArea);

    const toast = await this.toastCtrl.create({
      message: 'URLをクリップボードにコピーしました',
      duration: 2500,
    });
    await toast.present();
  }

  private checkBookmarked() {
    this.storage.get('bookmarks').then((data) => {
      if (data) {
        const bookmarks: Array<IStragePost> = JSON.parse(data);
        Array.prototype.forEach.call(bookmarks, (node) => {
          if (node.domain === environment.wordpressURL && node.postID === this.route.snapshot.paramMap.get('postID')) {
            this.bookmarked = true;
          }
        });
      }
    });
  }

  public async changeBookmark(): Promise<void>  {
    if (!this.article) {
      return;
    }

    if (this.bookmarked) {
      this.deleteLocalStrage('bookmarks').then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'この記事をお気に入りから削除しました。',
          duration: 2000,
          position: 'bottom',
        });
        await toast.present();
      });
    } else {
      this.saveLocalStrage('bookmarks').then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'この記事をお気に入りに追加しました。サイドメニューから確認できます',
          duration: 2000,
          position: 'bottom',
        });
        await toast.present();
      });
    }
  }

  public async hidden(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '非表示にしますか？',
      message: 'この記事を非表示にしますか？？',
      buttons: [
        {
          text: '閉じる',
          role: 'cancel',
        },
        {
          text: '非表示にする',
          handler: () => {
            this.saveLocalStrage('hidden').then(async () => {
              const toast = await this.toastCtrl.create({
                message: 'この記事を非表示にしました',
                duration: 2000,
                position: 'bottom',
              });
              await toast.present();
              await this.navCtrl.pop();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private deleteLocalStrage(key: string) {
    return new Promise((resolve) => {
      let registerBookmarks: Array<IStragePost> = [];
      this.storage.get(key).then((data) => {
        if (data) {
          registerBookmarks = JSON.parse(data);
        } else {
          registerBookmarks = [];
        }

        const createBookmarks = registerBookmarks.filter((e) => {
          console.log([e.domain, environment.wordpressURL, String(e.postID), String(this.route.snapshot.paramMap.get('postID'))]);
          console.log(
            e.domain === environment.wordpressURL && String(e.postID) !== String(this.route.snapshot.paramMap.get('postID')),
          );
          return e.domain === environment.wordpressURL && String(e.postID) !== String(this.route.snapshot.paramMap.get('postID'));
        });

        this.bookmarked = false;
        this.storage.set(key, JSON.stringify(createBookmarks));

        return resolve();
      });
      return resolve();
    });
  }

  private saveLocalStrage(key: string) {
    return new Promise((resolve) => {
      const now = new Date();
      const bookmark: Array<IStragePost> = [
        {
          domain: environment.wordpressURL,
          postID: Number(this.route.snapshot.paramMap.get('postID')),
          article: this.article,
          created: now.getFullYear() + '-' + now.getMonth() + 1 + '-' + now.getDate(),
        },
      ];

      let registerBookmarks: Array<IStragePost> = [];

      this.storage.get(key).then((data) => {
        if (data) {
          registerBookmarks = JSON.parse(data);
        } else {
          registerBookmarks = [];
        }

        const createBookmarks = bookmark.concat(registerBookmarks);
        console.log(createBookmarks);

        this.bookmarked = true;
        this.storage.set(key, JSON.stringify(createBookmarks));

        return resolve();
      });
    });
  }

  private trimArticle() {
    Array.prototype.forEach.call(document.querySelectorAll('article iframe'), (node) => {
      node.setAttribute('width', '100%');
    });

    Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), (node) => {
      node.style.display = 'none';
    });

    Array.prototype.forEach.call(document.querySelectorAll('article a'), (node) => {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener');
    });

    Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), (node) => {
      node.style.width = '100%';
    });
  }

  private createShareURL(url, params: IPost) {
    if (params.origin.excerpt && params.origin.excerpt.length > 0) {
      params.origin.excerpt = params.origin.excerpt.replace(/\s|&nbsp;/g, '');
    }

    return {
      twitter:
        'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(url) +
        '&text=' +
        encodeURIComponent(params.origin.title),
    };
  }

}

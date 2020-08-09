import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { IAuthor, ICategory, IPost, ITag } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss'],
})
export class PagePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    // public navParams: NavParams,
    public wp: WordpressProvider,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
  ) { }
  public title: string;
  public article: IPost;
  public url: string = window.location.href;
  public shareURL: {
    twitter: string;
  };

  public ngOnInit() {
  }

  public ionViewWillEnter() {
    this.wp.getPostArticle(Number(this.route.snapshot.paramMap.get('postID'))).subscribe((data) => {
      this.title = !this.title ? data.title : this.title;
      this.article = data;
      // this.shareURL = this.createShareURL(this.url, data);
      setTimeout(() => {
        // this.trimArticle();
      }, 100);
    });
  }

  public viewAuthor(author: IAuthor): void {
    // this.navCtrl.setRoot('Author', { title: author.name, key: author.ID });
  }

  public viewCategory(category: ICategory): void {
    // this.navCtrl.setRoot('Category', { title: category.name, key: category.slug });
  }

  public viewTag(tag: ITag): void {
    // this.navCtrl.setRoot('Tag', { title: tag.name, key: tag.slug });
  }

  // addClipboard(): void {
  //   const body = document.body;
  //   const textArea = document.createElement('textarea');
  //   textArea.value = this.url;
  //   body.appendChild(textArea);
  //   textArea.select();
  //   document.execCommand('copy');
  //   body.removeChild(textArea);
  //
  //   const toast = this.toastCtrl.create({
  //     message: 'URLをクリップボードにコピーしました',
  //     duration: 2500,
  //   });
  //   toast.present();
  // }

  // private trimArticle() {
  //   Array.prototype.forEach.call(document.querySelectorAll('article iframe'), function(node) {
  //     node.setAttribute('width', '100%');
  //   });
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), function(node) {
  //     node.style.display = 'none';
  //   });
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('article a'), function(node) {
  //     node.setAttribute('target', '_blank');
  //     node.setAttribute('rel', 'noopener');
  //   });
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), function(node) {
  //     node.style.width = '100%';
  //   });
  // }

  // private createShareURL(url, params: IPost) {
  //   if (params.origin.excerpt && params.origin.excerpt.length > 0) {
  //     params.origin.excerpt = params.origin.excerpt.replace(/\s|&nbsp;/g, '');
  //   }
  //
  //   return {
  //     twitter:
  //       'https://twitter.com/intent/tweet?url=' +
  //       encodeURIComponent(url) +
  //       '&text=' +
  //       encodeURIComponent(params.origin.title),
  //   };
  // }
}

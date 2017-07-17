import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePost, InterfaceCategory, InterfaceTag, InterfaceAuthor } from '../../interface/wordpress'

@IonicPage({
    segment: 'page/:postID',
})
@Component({
    selector: 'page',
    templateUrl: 'page.html',
    providers: [ WordpressProvider ]
})
export class Page {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp:WordpressProvider,
        public toastCtrl: ToastController,
        public storage: Storage,
    ){}

    title:string;
    article:InterfacePost;
    url:string = window.location.href;

    ionViewDidLoad() {
        if(this.navParams.get('title')){
            this.title = this.navParams.get('title');
        }

        this.storage.get('domain').then((val) => {
            this.wp.getPostArticle(val, this.navParams.get('postID'))
                .subscribe(
                    (data: InterfacePost) => {
                        this.title = (!this.title) ? data.title : this.title;
                        this.article = data;
                        setTimeout(() => {
                            this.trimArticle();
                        }, 100);
                    }
                );
        });
    }

    viewAuthor(author:InterfaceAuthor):void
    {
        this.navCtrl.setRoot('Author',{ title: author.name, key: author.ID});
    }

    viewCategory(category:InterfaceCategory):void
    {
        this.navCtrl.setRoot('Category',{ title: category.name, key: category.slug});
    }

    viewTag(tag:InterfaceTag):void
    {
        this.navCtrl.setRoot('Tag',{ title: tag.name, key: tag.slug});
    }

    private trimArticle()
    {
        Array.prototype.forEach.call(document.querySelectorAll('article iframe'), function(node) {
            node.setAttribute('width','100%');
        });

        Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), function(node) {
            node.style.display = 'none';
        });

        Array.prototype.forEach.call(document.querySelectorAll('article a'), function(node) {
            node.setAttribute('target','_blank');
            node.setAttribute('rel','noopener');
        });

        Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), function(node) {
            node.style.width = '100%'
        });
    }

}


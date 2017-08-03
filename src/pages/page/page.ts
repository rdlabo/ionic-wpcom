import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
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
        public platform:Platform,
        public iab: InAppBrowser,
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
        Array.prototype.forEach.call(document.querySelectorAll('article iframe'), (node)=> {
            node.setAttribute('width','100%');
        });

        Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), (node)=> {
            node.style.display = 'none';
        });

        Array.prototype.forEach.call(document.querySelectorAll('article a'), (node)=> {
            node.setAttribute('target','_blank');
            node.setAttribute('rel','noopener');
            if(this.platform.is('cordova')){
                node.addEventListener('click',
                    (e)=>{
                        e.preventDefault();
                        const browser = this.iab.create(node.getAttribute('href'), '_blank');
                        browser.show();
                    }, false);
            }
        });

        Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), (node)=> {
            node.style.width = '100%'
        });
    }

}


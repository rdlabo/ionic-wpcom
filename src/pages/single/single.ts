import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePost, InterfaceCategory, InterfaceTag, InterfaceAuthor } from '../../interface/wordpress'
import { noImageURL } from '../../wp-config';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@IonicPage({
    segment: 'single/:postID',
    defaultHistory: ['Archive']
})
@Component({
    selector: 'single',
    templateUrl: 'single.html',
    providers: [ WordpressProvider ]
})
export class Single {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp:WordpressProvider,
        public toastCtrl: ToastController,
        public storage: Storage,
        public admobFree: AdMobFree,
        public platform: Platform
    ){}

    title:string;
    article:InterfacePost;
    url:string = window.location.href;
    noImageURL:string = noImageURL;

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

        if(this.platform.is('cordova')){
            const bannerConfig: AdMobFreeBannerConfig = {
                isTesting: false,
                autoShow: false,
                id: "ca-app-pub-1053575285730954~7013757626"
            };
            this.admobFree.banner.config(bannerConfig);

            this.admobFree.banner.prepare()
                .then(() => {
                    this.admobFree.banner.show();
                })
                .catch(e => console.log(e));
        }
    }

    ionViewWillLeave(){
        if(this.platform.is('cordova')){
            this.admobFree.banner.hide();
        }
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


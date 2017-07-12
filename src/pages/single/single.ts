import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePost, InterfaceCategory } from '../../interface/wordpress'
import { facebookAppID } from '../../wp_config';

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
        public toastCtrl: ToastController
    ){}

    title:string;
    article:InterfacePost;
    url:string = window.location.href;
    shareURL : {
        facebook: string,
        twitter : string
    };

    ionViewDidLoad() {
        if(this.navParams.get('title')){
            this.title = this.navParams.get('title');
        }

        this.wp.getPostArticle(this.navParams.get('postID'))
            .subscribe(
                data => {
                    this.title = (!this.title)?data.title:this.title;
                    this.article = data;
                    this.shareURL = this.createShareURL(this.url, data);
                    setTimeout(()=>{
                        this.trimArticle();
                    }, 100);
                }
            );
    }

    viewCategory(category:InterfaceCategory):void
    {
        this.navCtrl.setRoot('Category',{ title: category.name, slug: category.slug});
    }

    addClipboard():void
    {
        const body = document.body;
        let text_area = document.createElement("textarea");
        text_area.value = this.url;
        body.appendChild(text_area);
        text_area.select();
        document.execCommand("copy");
        body.removeChild(text_area);

        let toast = this.toastCtrl.create({
            message: 'URLをクリップボードにコピーしました',
            duration: 2500,
        });
        toast.present();
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
        });

        Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), function(node) {
            node.style.width = '100%'
        });
    }

    private createShareURL(url, params:InterfacePost)
    {
        if(params.excerpt && params.excerpt.length > 0){
            params.excerpt = params.excerpt.replace(/\s|&nbsp;/g, '')
        }

        return {
            facebook :  "https://www.facebook.com/dialog/share?" +
            "app_id=" + facebookAppID +
            "&display=popup" +
            "&href=" + encodeURIComponent(url) +
            "&picture=" + encodeURIComponent(params.post_thumbnail.URL) +
            "&title="+ encodeURIComponent(params.title) +
            "&caption=" + encodeURIComponent(params.excerpt) +
            "&redirect_uri=" + encodeURIComponent(url) +
            "&hashtag = AreaInnovationReview" +
            "&display=page",

            twitter :  "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) +
            "&text=" + encodeURIComponent(params.title)
        }
    }
}


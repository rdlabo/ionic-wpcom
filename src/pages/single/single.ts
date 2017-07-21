import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePost, InterfaceCategory, InterfaceTag, InterfaceAuthor, InterfaceBookmark } from '../../interface/wordpress'
import { wordpressURL, noImageURL } from '../../wp-config';

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
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public storage: Storage,
        public wp:WordpressProvider,
        public toastCtrl: ToastController
    ){}

    title:string;
    article:InterfacePost;
    url:string = window.location.href;
    shareURL : {
        twitter : string
    };
    noImageURL:string = noImageURL;
    bookmarked:boolean = false;

    ionViewDidLoad() {
        if(this.navParams.get('title')){
            this.title = this.navParams.get('title');
        }

        this.wp.getPostArticle(this.navParams.get('postID'))
            .subscribe(
                (data:InterfacePost) => {
                    this.title = (!this.title)?data.title:this.title;
                    this.article = data;
                    this.shareURL = this.createShareURL(this.url, data);
                    setTimeout(()=>{
                        this.trimArticle();
                    }, 100);
                    this.checkBookmarked();
                }
            );
    }

    viewAuthor(author:InterfaceAuthor):void {
        this.navCtrl.setRoot('Author',{ title: author.name, key: author.ID});
    }

    viewCategory(category:InterfaceCategory):void {
        this.navCtrl.setRoot('Category',{ title: category.name, key: category.slug});
    }

    viewTag(tag:InterfaceTag):void {
        this.navCtrl.setRoot('Tag',{ title: tag.name, key: tag.slug});
    }

    addClipboard():void {
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

    private checkBookmarked(){
        this.storage.get('bookmarks').then((data)=>{
            if(data){
                const bookmarks:Array<InterfaceBookmark> = JSON.parse(data);
                Array.prototype.forEach.call(bookmarks, (node)=> {
                    if(node.domain == wordpressURL && node.postID == this.navParams.get('postID')){
                        this.bookmarked = true;
                    }
                });
            }
        });
    }

    saveBookmark():void {
        if(!this.article){
            return;
        }
        this.saveLocalStrage('bookmarks').then(()=>{
            let toast = this.toastCtrl.create({
                message: 'この記事をお気に入りに追加しました。サイドメニューから確認できます',
                duration: 2000,
                position: 'bottomop'
            });
            toast.present();
        });
    }

    hidden():void {
        let alert = this.alertCtrl.create({
            title: '非表示にしますか？',
            message: 'この記事を非表示にしますか？？',
            buttons: [
                {
                    text: '閉じる',
                    role: 'cancel',
                },
                {
                    text: '非表示にする',
                    handler: () => {
                        this.saveLocalStrage('hidden').then(()=>{
                            let toast = this.toastCtrl.create({
                                message: 'この記事を非表示にしました',
                                duration: 2000,
                                position: 'bottomop'
                            });
                            toast.present();
                            this.navCtrl.pop();
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    private saveLocalStrage(key:string){
        return new Promise((resolve)=>{
            const now = new Date();
            const bookmark:Array<InterfaceBookmark> = [{
                domain: wordpressURL,
                postID: this.navParams.get('postID'),
                article: this.article,
                created: now.getFullYear() + '-' + now.getMonth()+1 + '-' + now.getDate()
            }];

            let registerBookmarks:Array<InterfaceBookmark> = [];

            this.storage.get(key).then((data)=>{
                if(data){
                    registerBookmarks = JSON.parse(data);
                }else{
                    registerBookmarks = [];
                }

                const createBookmarks = bookmark.concat(registerBookmarks);
                console.log(createBookmarks);

                this.bookmarked = true;
                this.storage.set(key, JSON.stringify(createBookmarks));

                return resolve();
            });
        })
    }

    private trimArticle() {
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

    private createShareURL(url, params:InterfacePost) {
        if(params.origin.excerpt && params.origin.excerpt.length > 0){
            params.origin.excerpt = params.origin.excerpt.replace(/\s|&nbsp;/g, '')
        }

        return {
            twitter :  "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) +
            "&text=" + encodeURIComponent(params.origin.title)
        }
    }
}


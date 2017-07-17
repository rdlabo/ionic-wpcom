import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePostParams, InterfacePost } from '../../interface/wordpress';
import { Storage } from '@ionic/storage';

@IonicPage({
    segment: 'author/:key',
})
@Component({
    selector: 'author',
    templateUrl: 'author.html',
    providers:[ WordpressProvider ]
})
export class Author {

    type:string = '執筆者';
    title:string;
    search: InterfacePostParams = {
        type : 'wait',
        authorID : this.navParams.get('key')
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp: WordpressProvider,
        public storage: Storage,
    ) {}

    ionViewDidLoad(){
        this.title = this.navParams.get('title');

        const f = () => new Promise(
            (resolve)=>{
                resolve(this.navParams.get('key'));
            }
        );
        f().then(
            (ID:number) => {
                // use not require auth resource.

                this.storage.get('domain').then((val) => {
                    this.wp.getPostList(val, 0, {'authorID': ID})
                        .subscribe(
                            (data: Array<InterfacePost>) => {
                                this.title = data[0].author.name;
                            }
                        );
                });

                this.search = {
                    type: 'post',
                    authorID : this.navParams.get('key')
                }
            }
        );

    }
}

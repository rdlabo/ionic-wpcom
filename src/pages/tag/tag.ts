import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePostParams, InterfaceTag } from '../../interface/wordpress'
import { Storage } from '@ionic/storage';

@IonicPage({
    segment: 'tag/:key',
})
@Component({
    selector: 'tag',
    templateUrl: 'tag.html',
    providers:[ WordpressProvider ]
})
export class Tag {

    type:string = 'タグ';
    title:string;
    search: InterfacePostParams = {
        type : 'wait',
        categorySlug : this.navParams.get('key')
    }

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
            (slug:string) => {

                this.storage.get('domain').then((val) => {
                    this.wp.getCategory(val,slug)
                        .subscribe(
                            (data: InterfaceTag) => this.title = data.name
                        );

                    this.search = {
                        type: 'post',
                        tagSlug: this.navParams.get('key')
                    }
                });
            }
        );

    }
}

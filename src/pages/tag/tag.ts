import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePostParams, InterfaceTag } from '../../interface/wordpress'

@IonicPage({
    segment: 'tag/:slug',
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
        categorySlug : this.navParams.get('slug')
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp: WordpressProvider
    ) {}

    ionViewDidLoad(){
        if(this.navParams.get('title')){
            this.title = this.navParams.get('title');
        }else{
            const f = () => new Promise(
                (resolve)=>{
                    resolve(this.navParams.get('slug'));
                }
            );
            f().then(
                (slug:string) => {
                    this.wp.getCategory(slug)
                        .subscribe(
                            (data:InterfaceTag) => this.title = data.name
                        );
                }
            );
        }

        this.search = {
            type: 'post',
            tagSlug : this.navParams.get('slug')
        }
    }
}

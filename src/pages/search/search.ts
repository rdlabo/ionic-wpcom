import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { InterfacePostParams } from '../../interface/wordpress'
import { AppState, InterfaceKeyword } from '../../interface/store'
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@IonicPage({
    segment: 'search'
})
@Component({
    selector: 'search',
    templateUrl: 'search.html',
    providers:[ WordpressProvider ]
})
export class Search {

    title:string;
    keywordStore$:Observable<InterfaceKeyword>;
    search: InterfacePostParams = {
        type : 'wait'
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp: WordpressProvider,
        public store:Store<AppState>,
    ) {}

    ionViewDidLoad(){
        this.keywordStore$ = this.store.select('search');
        this.keywordStore$.subscribe(
            (data:InterfaceKeyword) => {
                console.log(data);
                this.title = data.keyword;
                this.search = {
                    type: 'post',
                    search: data.keyword
                }
            }
        )
    }
}

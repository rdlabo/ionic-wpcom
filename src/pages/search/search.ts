import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { InterfacePostParams } from '../../interface/wordpress'
import { AppState } from '../../interface/store'
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
    keywordStore$:Observable<string>;
    search: InterfacePostParams = {
        type : 'wait',
        search : ''
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
            (keyword) => {
                this.title = String(keyword);
                this.search = {
                    type: 'post',
                    search: String(keyword)
                }
            }
        )
    }
}

import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';

import { InterfacePost, InterfacePostParams } from '../../../interface/wordpress'
import { WordpressProvider } from '../../../providers/wordpress/wordpress';


@Component({
    selector: 'posts',
    templateUrl: 'posts.html',
    providers:[ WordpressProvider ]
})
export class PostsComponent implements OnChanges {

    @Input() search: InterfacePostParams;
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.Loaded = false;
        if(this.search.type != 'wait'){
            this.subject.next();
        }
    }

    constructor(
        public nav:NavController,
        public wp: WordpressProvider,
        public storage: Storage,
    ) {
        this.initializeSubject();
    }

    page:number = 1;
    posts: Array<InterfacePost> = [];
    subject;
    Loaded;

    ionViewWillLeave(){
        if(this.subject){
            this.subject.unsubscribe();
        }
    }

    doInfinite(infiniteScroll) {

        this.getPostList().then(
            (data:Array<InterfacePost>) => {
                this.page++;
                this.posts = this.posts.concat(data);
                if(data.length > 0) {
                    infiniteScroll.complete();
                }else{
                    infiniteScroll.enable(false);
                }
            },
            error => {
                infiniteScroll.complete();
            }
        );
    }

    viewSingle(post): void {
        this.nav.push('Single',
            { postID: post.ID ,title: post.title});
    }

    private initializeSubject(){
        this.subject = new Subject();
        this.subject
            .switchMap(obj => {
                return this.getPostList()
            })
            .subscribe(
                (data:Array<InterfacePost>) => {
                    this.page = 2;
                    this.posts = data;
                }
            )
    }

    private getPostList() {
        return new Promise ((resolve, reject) => {
            this.storage.get('domain').then((val) => {
                this.wp.getPostList(val, this.page, this.search)
                    .subscribe(
                        data => {
                            this.Loaded = true;
                            resolve(data)
                        },
                        error => {
                            reject(error);
                        }
                    );
            });
        });
    }
}

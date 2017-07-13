import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { NavController } from 'ionic-angular';
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
        if(this.search.type != 'wait'){
            console.log('get_article');
            this.getPostList().then(
                (data:Array<InterfacePost>) => {
                    this.page = 1;
                    this.posts = data;
                }
            );
        }
    }

    constructor(
        public nav:NavController,
        public wp: WordpressProvider
    ) {}

    page:number = 1;
    posts: Array<InterfacePost> = [];

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

    viewArticle(post): void {
        this.nav.push('Single',
            { postID: post.ID ,title: post.title});
    }

    private getPostList() {
        return new Promise ((resolve, reject) => {
            console.log(this.search);
            this.wp.getPostList(this.page, this.search)
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data)
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }
}

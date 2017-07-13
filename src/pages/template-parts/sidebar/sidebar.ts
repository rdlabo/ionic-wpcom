import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Nav } from 'ionic-angular';
import { InterfacePost, InterfaceCategory } from '../../../interface/wordpress'
import { WordpressProvider } from '../../../providers/wordpress/wordpress';

export interface InterfacePage {
    title: string,
    component: any,
    params:any
}

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.html',
    providers:[ WordpressProvider ]
})
export class SidebarComponent {
    @ViewChild(Nav) nav: Nav;
    @Output() setRootPage = new EventEmitter();

    pages: Array<InterfacePage>;
    categories: Array<InterfacePage>;

    constructor(
        public wp: WordpressProvider
    ) {}

    ngOnInit(){
        console.log('sidebar');
        this.pages = [
            { title: '最近の投稿', component: 'Archive', params: {} },
        ];

        this.categories = [];

        this.wp.getPostList(0, 'page')
            .subscribe(
                data => {
                    Array.prototype.forEach.call(data, (page:InterfacePost) => {
                        this.pages.push({
                            title: page.title,
                            component: 'Single',
                            params: {
                                postID:page.ID,
                                title: page.title
                            }
                        });
                    });
                },
                error => {

                }
            );


        this.wp.getCategoryList()
            .subscribe(
                data => {
                    Array.prototype.forEach.call(data, (cat:InterfaceCategory) => {
                        if(cat.post_count > 0 && cat.parent == 0) {
                            this.categories.push({
                                title: cat.name,
                                component: 'Category',
                                params: {
                                    title: cat.name,
                                    slug:cat.slug,
                                }
                            });
                        }
                    });
                },
                error => {

                }
            );
    }

    openPage(page:InterfacePage):void {
        this.setRootPage.emit(page);
    }
}

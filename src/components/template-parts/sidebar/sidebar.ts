import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Nav, LoadingController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from '@app/environment';
import { IPost, ICategory } from '@/interfaces/wordpress';
import { IAppState, ICurrent } from '@/interfaces/store';
import { WordpressProvider } from '@/providers/wordpress/wordpress';

export interface InterfacePage {
  ID: string;
  title: string;
  component: any;
  params: any;
  active?: boolean;
}

@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.html',
  providers: [WordpressProvider],
})
export class SidebarComponent {
  @ViewChild(Nav) nav: Nav;
  @Output() setRootPage = new EventEmitter();

  pages: Array<InterfacePage>;
  categories: Array<InterfacePage>;
  currentStore$: Observable<ICurrent>;

  constructor(public wp: WordpressProvider, public loadingCtrl: LoadingController, public store: Store<IAppState>) {}

  ngOnInit() {
    this.initializeMenu();
  }

  openPage(page: InterfacePage): void {
    this.setRootPage.emit(page);
  }

  private initializeMenu() {
    this.pages = [
      { ID: 'defaul', title: '最近の投稿', component: 'Archive', params: {} },
      { ID: 'bookmark', title: 'お気に入り', component: 'Bookmark', params: {} },
    ];

    this.categories = [];
    this.wp.getPostList(0, { type: 'page' }).subscribe(
      data => {
        Array.prototype.forEach.call(data, (page: IPost) => {
          if (environment.excludePages.indexOf(page.ID) < 0) {
            this.pages.push({
              ID: String(page.ID),
              title: page.title,
              component: 'Page',
              params: {
                postID: page.ID,
                title: page.title,
              },
            });
          }
        });
      },
      error => {},
    );

    this.wp.getCategoryList().subscribe(
      data => {
        Array.prototype.forEach.call(data, (cat: ICategory) => {
          if (cat.post_count > 0 && cat.parent == 0) {
            this.categories.push({
              ID: cat.slug,
              title: cat.name,
              component: 'Category',
              params: {
                title: cat.name,
                key: cat.slug,
              },
            });
          }
        });
      },
      error => {},
    );

    this.currentStore$ = this.store.select('current');
    this.currentStore$.subscribe(data => {
      this.pages = this.checkCurrentPage(this.pages, 'postID', data);
      this.categories = this.checkCurrentPage(this.categories, 'key', data);
    });
  }

  private checkCurrentPage(pages: Array<InterfacePage>, label, currentData: ICurrent) {
    const checkedPage = [];
    if (pages[0] && currentData.page) {
      Array.prototype.forEach.call(pages, page => {
        const active =
          page.component.toLowerCase().slice(0, 4) === currentData.page.toLowerCase().slice(0, 4) &&
          page.params[label] === currentData.opt[label];
        checkedPage.push({
          ID: page.ID,
          title: page.title,
          component: page.component,
          params: page.params,
          active: active,
        });
      });
      return checkedPage;
    } else {
      return pages;
    }
  }
}

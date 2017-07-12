import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WordpressProvider } from '../providers/wordpress/wordpress';
import { InterfacePost, InterfaceCategory } from '../interface/wordpress';

export interface InterfacePage {
  title: string,
  component: any,
    params:any
};

@Component({
  templateUrl: 'app.html',
  providers:[ WordpressProvider ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'Archive';
  pages: Array<InterfacePage>;
    categories: Array<InterfacePage>;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public wp:WordpressProvider
  ) {
    this.initializeApp();
    this.setMenu();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private setMenu() {
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
    this.nav.setRoot(page.component, page.params);
  }
}

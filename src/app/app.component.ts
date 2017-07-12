import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export interface InterfacePage {
  title: string,
  component: any,
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'HomePage';
  pages: Array<InterfacePage>;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    this.pages = [
      { title: '最近の更新', component: 'Archive' },
      { title: 'ページ一覧', component: 'ListPages'},
      { title: 'カテゴリ', component: 'CategoryPage'},
      { title: 'タグ', component: 'TagPage'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WordpressProvider } from '../providers/wordpress/wordpress';


@Component({
  templateUrl: 'app.html',
  providers:[ WordpressProvider ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'Archive';

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public wp:WordpressProvider
  ) {
    this.initializeApp();
  }

  handlesetRootPage($event){
    this.nav.setRoot($event.component, $event.params);
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

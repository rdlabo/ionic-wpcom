import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import { REGISTER, DELETE } from '../store/search';

import { WordpressProvider } from '../providers/wordpress/wordpress';
import { AppState } from '../interface/store';


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
      public wp:WordpressProvider,
      public store:Store<AppState>,
  ) {
    this.initializeApp();
  }

  handlesetRootPage($event){
    this.nav.setRoot($event.component, $event.params);
  }

  handlesetSearchKeyword(keyword:string){
    this.store.dispatch({type: REGISTER, payload: keyword});
  }

  handlestartSearch() {
    if(this.nav.getActive().name !== 'Search'){
      this.nav.setRoot('Search');
    }
  }

  handlecancelSearchKeyword() {
    this.store.dispatch({type: DELETE});
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

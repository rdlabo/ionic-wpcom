import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';

import { REGISTER as REGISTER1, DELETE as DELETE1 } from '../store/search';
import { REGISTER as REGISTER2, DELETE as DELETE2 } from '../store/current';

import { WordpressProvider } from '../providers/wordpress/wordpress';
import { AppState } from '../interface/store';


@Component({
  templateUrl: 'app.html',
  providers:[ WordpressProvider ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'Archive';
  intervalCurrentPage : number;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public wp:WordpressProvider,
      public store:Store<AppState>,
  ) {
    this.initializeApp();
  }

  ionViewDidEnter(){
    clearInterval(this.intervalCurrentPage)
  }

  handlesetRootPage($event){
    this.nav.setRoot($event.component, $event.params);
  }

  handlesetSearchKeyword(keyword){
    this.store.dispatch({type: REGISTER1, payload: { keyword: keyword }});
  }

  handlestartSearch() {
    if(this.nav.getActive().id != 'Search'){
      this.nav.setRoot('Search');
    }
  }

  handlecancelSearchKeyword() {
    this.store.dispatch({type: DELETE1});
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.intervalCurrentPage = setInterval(()=>{
      if(this.nav.getActive()){
        this.store.dispatch({type: REGISTER2, payload: { page:this.nav.getActive().id, opt:this.nav.getActive().data }});
      }
    },1000)
  }
}

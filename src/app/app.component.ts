import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';

// import {DELETE as DELETE1, REGISTER as REGISTER1} from "../../_old/src/reducers/search";
// import {REGISTER as REGISTER2} from "../../_old/src/reducers/current";

import { IAppState } from '../interfaces/store';
import { ISite } from '../interfaces/wordpress';
import { WordpressProvider } from '../providers/wordpress/wordpress';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // rootPage = 'Archive';
  public intervalCurrentPage: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public store: Store<IAppState>,
  ) {
    this.initializeApp();
  }

  public ionViewDidLeave() {
    clearInterval(this.intervalCurrentPage);
  }

  public handlesetRootPage($event) {
    if ($event.component === 'category') {
      console.log("AppComponent -> handlesetRootPage -> $event.component", $event.component)
      this.navCtrl.navigateRoot(`${$event.component}/${$event.params.key}`);
      return;
    }
    if ($event.params.postID !== undefined) {
    console.log("AppComponent -> handlesetRootPage -> $event.params.postID", $event.params.postID)
      this.navCtrl.navigateRoot(`/${$event.component}/${$event.params.postID}`);
      return;
    }

    console.log('カテゴリ？',`/${$event.component}/${$event.params.postID}`);
    this.navCtrl.navigateRoot(`${$event.component}`);

    //this.navCtrl.navigateRoot(`/${$event.component}/${$event.params.postID}`);
  }
  //
  // handlesetSearchKeyword(keyword) {
  //   this.store.dispatch({ type: REGISTER1, payload: { keyword: keyword } });
  // }
  //
  // handlestartSearch() {
  //   if (this.nav.getActive().id != 'Search') {
  //     this.nav.setRoot('Search');
  //   }
  // }
  //
  // handlecancelSearchKeyword() {
  //   this.store.dispatch({ type: DELETE1 });
  // }
  //
  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // this.intervalCurrentPage = window.setInterval(() => {
    //   // if (this.nav.getActive()) {
    //   //   this.store.dispatch({
    //   //     type: REGISTER2,
    //   //     payload: { page: this.nav.getActive().id, opt: this.nav.getActive().data },
    //   //   });
    //   // }
    // }, 1000);
  }
}

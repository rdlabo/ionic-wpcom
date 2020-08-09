import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Store } from "@ngrx/store";

//import {DELETE as DELETE1, REGISTER as REGISTER1} from "../../_old/src/reducers/search";
//import {REGISTER as REGISTER2} from "../../_old/src/reducers/current";

import { WordpressProvider } from "../providers/wordpress/wordpress";
import { ISite } from "../interfaces/wordpress";
import { IAppState } from "../interfaces/store";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  //rootPage = 'Archive';
  intervalCurrentPage: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public store: Store<IAppState>
  ) {
    this.initializeApp();
  }

  ionViewDidLeave() {
    clearInterval(this.intervalCurrentPage);
  }

  handlesetRootPage($event) {
    if ($event.params.postID === undefined) {
      this.navCtrl.navigateRoot(`${$event.component}`);
      return;
    }
    this.navCtrl.navigateRoot(`${$event.component}/${$event.params.postID}`);
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

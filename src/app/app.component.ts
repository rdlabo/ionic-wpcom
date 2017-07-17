import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';

import { REGISTER as REGISTER1, DELETE as DELETE1 } from '../store/search';
import { REGISTER as REGISTER2 } from '../store/current';

import { WordpressProvider } from '../providers/wordpress/wordpress';
import { InterfaceSite } from '../interface/wordpress';
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
      public loadingCtrl: LoadingController,
      public storage: Storage,
      public modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    const loading = this.loadingCtrl.create({ content:'Loading...' });
    loading.present();

    this.storage.get('domain').then((val) => {
      this.wp.getSiteInfo(val)
          .subscribe(
              (data:InterfaceSite) => {
                loading.dismiss();
              },
              (error) => {
                loading.dismiss();
                if(error.status == 401 || error.status == 404){
                  const settingModal = this.modalCtrl.create('Setting');
                  settingModal.present();
                }else{
                  this.wp.errorResponse(error)
                }
              }
          );
    });
  }

  ionViewDidLeave(){
    clearInterval(this.intervalCurrentPage);
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SharedModule } from './_shared/shared.module';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { WordpressProvider } from '../providers/wordpress/wordpress';
import { reducers } from '../reducers';

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers),
  ],
  exports: [SidebarComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WordpressProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

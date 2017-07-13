import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/index';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { WordpressProvider } from '../providers/wordpress/wordpress';

import { HeaderComponentModule } from '../pages/header/header.module';
import { SidebarComponentModule} from '../pages/template-parts/sidebar/sidebar.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(reducer),
    HeaderComponentModule,
    SidebarComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WordpressProvider
  ]
})
export class AppModule {}

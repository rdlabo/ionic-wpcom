import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StoreModule } from '@ngrx/store';
import { reducers } from '../reducers';

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
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        HeaderComponentModule,
        SidebarComponentModule,
        IonicStorageModule.forRoot(),
        StoreModule.forRoot(reducers),
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

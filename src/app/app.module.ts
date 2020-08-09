import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./_shared/shared.module";
import { SidebarComponent } from "./_shared/sidebar/sidebar.component";

import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../reducers";
import { WordpressProvider } from "../providers/wordpress/wordpress";

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

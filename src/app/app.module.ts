import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreProvider } from '../providers/store/store';
import { AuthProvider } from '../providers/auth/auth';
import { AuthStateProvider } from '../providers/auth-state/auth-state';
import { OverlayProvider } from '../providers/overlay/overlay';
import { StoreInstanceProvider } from '../providers/store-instance/store-instance';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StoreProvider,
    AuthProvider,
    AuthStateProvider,
    OverlayProvider,
    StoreInstanceProvider,
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SamplePageModule } from '../pages/sample/sample.module';

import {
  appReducer, AppEffects,
  authReducer, AuthEffects,
  hubProductsReducer, HubProductsEffects,
  hubThemesReducer, HubThemesEffects,
  preferencesReducer, PreferencesEffects,
  globalReducer,
} from '../redux/redux-scratch';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreProvider } from '../providers/store/store';
import { OverlayProvider } from '../providers/overlay/overlay';
import { AuthProvider } from '../providers/auth/auth';
import { HubProductsProvider } from '../providers/hub-products/hub-products';
import { HubThemesProvider } from '../providers/hub-themes/hub-themes';
import { PreferencesProvider } from '../providers/preferences/preferences';
import { appStore } from '../store/root/state';
import { ClientProvider } from '../providers/client/client';
import { UserMetadataEffect, AppStatusEffect, AppProductEffect, AppThemeEffect } from '../effects/effects';

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
    FormsModule,
    StoreModule.forRoot({
      ...appStore
      /*
      globalState: globalReducer,
      appState: appReducer,
      authState: authReducer,
      hubProducts: hubProductsReducer,
      hubThemes: hubThemesReducer,
      preferences: preferencesReducer
      */
    }),
    EffectsModule.forRoot([
      UserMetadataEffect,
      AppStatusEffect,
      AppThemeEffect,
      AppProductEffect
      /*
      AppEffects,
      AuthEffects,
      HubProductsEffects,
      HubThemesEffects,
      PreferencesEffects
      */
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    SamplePageModule
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
    OverlayProvider,
    StoreProvider,
    AuthProvider,
    HubProductsProvider,
    HubThemesProvider,
    PreferencesProvider,
    ClientProvider,
    UserMetadataEffect,
    AppStatusEffect,
    AppThemeEffect,
    AppProductEffect
  ]
})
export class AppModule {}

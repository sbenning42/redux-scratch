import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SamplePage } from '../pages/sample/sample';
import { Observable } from 'rxjs';
import { StoreProvider } from '../providers/store/store';
import { map } from '../redux/ngrx-helpers';
import { GlobalState } from '../redux/redux-scratch';
import { AppStatusStore, AppProcessStatuses } from '../store/root/state';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storeProvider: StoreProvider

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sample', component: SamplePage }
    ];

  }

  startAppWhenProcessStatusIsReady() {
    const s = this.storeProvider.manager.selectAppStatus()
      .subscribe((appStatusStore: AppStatusStore) => {
        if (appStatusStore.process === AppProcessStatuses.ready) {
          this.rootPage = SamplePage;
          console.log('Store Ready ! ', appStatusStore.process);
          s.unsubscribe();
        } else {
          console.log('Store not ready yet: ', appStatusStore.process);
        }
      });
  }

  initializeStore() {
    this.storeProvider.manager.appStatusSetProcessReady();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.startAppWhenProcessStatusIsReady();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.initializeStore();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

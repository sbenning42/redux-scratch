import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StoreProvider } from '../providers/store/store';
import { AuthStateProvider } from '../providers/auth-state/auth-state';
import { StoreInstanceProvider } from '../providers/store-instance/store-instance';
import { State } from '../redux/redux/state';
import { Reducer } from '../redux/redux/reducer';
import { Effect } from '../redux/redux/effect';
import { Action } from '../redux/redux/action';
import { Observable } from 'rxjs';

export class AppState extends State<{title: string}> {}

export enum AppAction {
  change = 'change',
  reset = 'reset'
}

export class StateReducer extends Reducer<{title: string}> {
  reduce(state: AppState, action: Action<any>): AppState {
    switch (action.type) {
      case AppAction.change:
        state.obj.title = action.value.title;
        break ;
      default:
        break ;
    }
    return state;
  }
}

export class StateEffect extends Effect<{title: string}> {
  effect(state: AppState, action: Action<any>, dispatcher: (s: string, a: Action) => Observable<AppState>): Observable<AppState> {
    return Observable.create(subscriber => {
      console.log('StateEffect: ', action);
      let sub;
      switch (action.type) {
        case AppAction.change:
          break ;
        case AppAction.reset:
          sub = dispatcher('app', new Action(AppAction.change, {title: 'Redux App'})).subscribe(next => subscriber(next));
        default:
          break ;
      }
      return () => sub.unsubscribe();
    });
  }
}

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
    public store: StoreInstanceProvider

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  initializeStore() {
    this.store.instance.register(
      'app',
      new AppState({title: 'Redux App'}),
      new StateReducer,
      new StateEffect
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initializeStore();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = HomePage;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

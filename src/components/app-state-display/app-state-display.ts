import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoreProvider } from '../../providers/store/store';

import {
  AppState,
  AppFlushErrorsAction,
  AppLoadingStartAction,
  AppLoadingStopAction
} from '../../redux/redux-scratch';


/**
 * Generated class for the AppStateDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-state-display',
  templateUrl: 'app-state-display.html'
})
export class AppStateDisplayComponent implements OnInit, OnDestroy {

  sub: Subscription;

  name: string = '';
  version: string = '';
  loading: boolean = false;
  errors: Error[] = undefined;
  lastError: Error = undefined;

  constructor(public storeProvider: StoreProvider) {
    console.log('Hello AppStateDisplayComponent Component');
  }

  ngOnInit() {
    this.sub = this.storeProvider.store.select('appState')
      .subscribe((appState: AppState) => this.appStateChanged(appState));
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  appStateChanged(appState: AppState) {
    this.name = appState.name;
    this.version = appState.version;
    this.loading = appState.loading;
    this.errors = appState.errors;
    this.lastError = appState.lastError;
  }

  startLoading() {
    if (!this.loading) {
      this.storeProvider.store.dispatch(new AppLoadingStartAction('You can put any message here !'));
    };
  }

  stopLoading() {
    if (this.loading) {
      this.storeProvider.store.dispatch(new AppLoadingStopAction);
    }
  }

  flushErrors() {
    this.storeProvider.store.dispatch(new AppFlushErrorsAction);
  }

}

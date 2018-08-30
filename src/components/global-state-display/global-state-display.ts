import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { StoreProvider } from '../../providers/store/store';
import { GlobalState, GlobalSetErrorAction } from '../../redux/redux-scratch';

/**
 * Generated class for the GlobalStateDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'global-state-display',
  templateUrl: 'global-state-display.html'
})
export class GlobalStateDisplayComponent implements OnInit, OnDestroy {

  sub: Subscription;
  globalState: GlobalState;

  message: string;

  constructor(public storeProvider: StoreProvider) {
    console.log('Hello GlobalStateDisplayComponent Component');
  }

  ngOnInit() {
    this.sub = this.storeProvider.store.select('globalState')
      .subscribe((globalState: GlobalState) => this.globalState = globalState);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  setNewError() {
    const globalSetErrorAction = new GlobalSetErrorAction(new Error(this.message));
    this.message = undefined;
    this.storeProvider.store.dispatch(globalSetErrorAction);
  }

}

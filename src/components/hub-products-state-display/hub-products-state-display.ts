import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoreProvider } from '../../providers/store/store';

import {
  HubProduct,
  HubProductsState,
  HubProductsFetchRequestAction
} from '../../redux/redux-scratch';

/**
 * Generated class for the HubProductsStateDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hub-products-state-display',
  templateUrl: 'hub-products-state-display.html'
})
export class HubProductsStateDisplayComponent implements OnInit, OnDestroy {

  sub: Subscription;

  fetched: boolean = false;
  collection: HubProduct[] = [];

  constructor(public storeProvider: StoreProvider) {
    console.log('Hello HubProductsStateDisplayComponent Component');
  }

  ngOnInit() {
    this.sub = this.storeProvider.store.select('hubProducts')
      .subscribe((hubProductsState: HubProductsState) => this.hubProductsStateChanged(hubProductsState));
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  hubProductsStateChanged(hubProductsState: HubProductsState) {
    this.fetched = hubProductsState.fetched;
    this.collection = hubProductsState.collection.slice(0, 10);
  }

  fetch() {
    this.storeProvider.store.dispatch(new HubProductsFetchRequestAction);
  }

}

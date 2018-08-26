import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoreProvider } from '../../providers/store/store';

import {
  HubTheme,
  HubThemesState,
  HubThemesFetchRequestAction
} from '../../redux/redux-scratch';

/**
 * Generated class for the HubThemesStateDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hub-themes-state-display',
  templateUrl: 'hub-themes-state-display.html'
})
export class HubThemesStateDisplayComponent implements OnInit, OnDestroy {

  sub: Subscription;

  fetched: boolean = false;
  collection: HubTheme[] = [];

  constructor(public storeProvider: StoreProvider) {
    console.log('Hello HubThemesStateDisplayComponent Component');
  }

  ngOnInit() {
    this.sub = this.storeProvider.store.select('hubThemes')
      .subscribe((hubThemesState: HubThemesState) => this.hubThemesStateChanged(hubThemesState));
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  hubThemesStateChanged(hubThemesState: HubThemesState) {
    this.fetched = hubThemesState.fetched;
    this.collection = hubThemesState.collection.slice(0, 10);
  }

  fetch() {
    this.storeProvider.store.dispatch(new HubThemesFetchRequestAction);
  }

}

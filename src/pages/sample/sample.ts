import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StoreProvider } from '../../providers/store/store';

import { AppState } from '../../redux/redux-scratch';

import { Subscription } from 'rxjs';

/**
 * Generated class for the SamplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sample',
  templateUrl: 'sample.html',
})
export class SamplePage {
  
  sub: Subscription;

  appState: AppState;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SamplePage');
    this.sub = this.storeProvider.store.select('appState').subscribe((appState: AppState) => this.appStateChanged(appState));
  }

  ionViewDidLeave() {
    if (this.sub) this.sub.unsubscribe();
  }

  appStateChanged(appState: AppState) {
    this.appState = appState;
    this.name = appState.name;
  }

}

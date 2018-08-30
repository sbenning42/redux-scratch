import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StoreProvider } from '../../providers/store/store';

import { Subscription } from 'rxjs';
import { AppMetadataStore, AppErrorActionType, AppProductActionType } from '../../store/root/state';

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
  state: any = {};

  login: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SamplePage');
    this.sub = this.storeProvider.manager.selectUserMetadata().subscribe(
      state => {
        this.state = state;
        console.log(this.state);
      }
    );
  }

  fetch() {
    this.storeProvider.manager.appProductFetchRequest();
    this.storeProvider.manager.appThemeFetchRequest();
  }

  loginRequest() {
    this.storeProvider.manager.userMetadataSetCredentials(this.login, this.password);
    this.storeProvider.manager.userMetadataAuthentifyRequest();
  }

  ionViewDidLeave() {
    if (this.sub) this.sub.unsubscribe();
  }

}

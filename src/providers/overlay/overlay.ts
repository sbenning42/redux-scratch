import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading, Alert, LoadingOptions, AlertOptions } from 'ionic-angular';

/*
  Generated class for the OverlayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OverlayProvider {

  isLoading = false;
  isAlrt = false;
  loading: Loading;
  alrt: Alert;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    console.log('Hello OverlayProvider Provider');
  }

  createLoading(opts: LoadingOptions) {
    if (this.isLoading) return ;
    this.loading = this.loadingCtrl.create({...opts/*, duration: 3000*/});
  }

  createAlrt(opts: AlertOptions) {
    if (this.isAlrt) return ;
    this.alrt = this.alertCtrl.create(opts);
    this.alrt.onDidDismiss(() => this.isAlrt = false);
  }

  presentLoading() {
    if (this.isLoading) return ;
    this.loading.present();
    this.isLoading = true;
  }

  presentAlrt() {
    if (this.isAlrt) return ;
    this.alrt.present();
    this.isAlrt = true;
  }

  dismissLoading() {
    if (!this.isLoading) return ;
    this.loading.dismiss();
    this.isLoading = false;
  }

}

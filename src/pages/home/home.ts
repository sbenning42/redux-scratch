import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription, merge } from 'rxjs';
import { OverlayProvider } from '../../providers/overlay/overlay';
import { StoreProvider } from '../../providers/store/store';
import { tap } from 'rxjs/operators';
//import { CollectionData, GetAllAction, GetOneAction, DeleteAction } from '../../redux/redux';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(
    public navCtrl: NavController,
    public overlay: OverlayProvider,
    public storeProvider: StoreProvider
  ) {
  }

  ngOnInit() {

    this.sub = merge(
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}

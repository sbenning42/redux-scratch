import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';
import { OverlayProvider } from '../../providers/overlay/overlay';
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
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  fetch() {
    //this.store.instance.dispatch('app', new Action(AppAction.change, {title: 'Redux Action'})).subscribe();
  }
  get(id: string) {
    //this.store.instance.dispatch('app', new Action(AppAction.reset)).subscribe();
    // this.store.instance.dispatch();
  }
  delete(id: string) {
    // this.store.instance.dispatch();
  }

}










  //collectionData: CollectionData;



    //if (this.sub) this.sub.unsubscribe();
/*
  fetch() {
    this.store.instance.dispatch('collection', new GetAllAction);
  }

  get(item: {id: string, name: string}) {
    this.store.instance.dispatch('collection', new GetOneAction({id: item.id}));
  }

  delete(item: {id: string, name: string}) {
    this.store.instance.dispatch('collection', new DeleteAction({id: item.id}));
  }
*/
    /*this.sub = this.store.instance.select('collection').pipe(
      tap((data: CollectionData) => this.collectionData = data),
      tap((data: CollectionData) => console.log(data)),
    ).subscribe();
    */

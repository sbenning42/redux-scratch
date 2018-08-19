import { Injectable } from '@angular/core';
import { Store } from '../../models/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { State } from '../../models/state';
import { filter, switchMap } from 'rxjs/operators';
import { Reducer } from '../../models/reducer';
import { Effect } from '../../models/effect';
import { Action } from '../../models/action';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  private _store: Store;
  private _ready$: BehaviorSubject<boolean>;
  private ready$: Observable<boolean>;

  get steps(): string[] {
    // return this._store ? this._store.steps : [];
    return [];
  };

  get store(): Store {
    return this._store;
  }

  constructor() {
    console.log('Hello StoreProvider Provider');
    this._store = new Store({});
    this._ready$ = new BehaviorSubject(false);
    this.ready$ = this._ready$.asObservable().pipe(filter(bool => bool));
  }

  ready() {
    this._ready$.next(true);
  }

  combine(states: {[selector: string]: State<any>}) {
    this._store.combine(states);
  }

  select<T>(selector: string): Observable<T> {
    return this.ready$.pipe(switchMap(() => this._store.select(selector)));
  }

  registerReducers(reducers: {[selector: string]: Reducer<any>}) {
    this._store.registerReducers(reducers);
  }

  registerEffects(effects: {[selector: string]: Effect}) {
    this._store.registerEffects(effects);
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}

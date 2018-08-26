import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class StoreProvider {

  constructor(
    public store: Store<any>
  ) {
    console.log('Hello StoreProvider Provider');
  }

}

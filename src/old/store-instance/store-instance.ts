import { Injectable } from '@angular/core';
import { Store } from '../../redux/redux/store';


/*
  Generated class for the StoreInstanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreInstanceProvider {

  instance: Store;

  constructor() {
    console.log('Hello StoreInstanceProvider Provider');
    this.instance = new Store;
  }

}


/**
 *
 * import {
  Store,
  StateStore,
  CollectionState,
  CollectionData,
  GetAllManager,
  GetOneManager,
  CreateManager,
  UpdateManager,
  DeleteManager,
  DeletePendingManager,
  UpdatePendingManager,
  CreatePendingManager,
  GetOnePendingManager,
  GetAllPendingManager,
  GetAllSuccessManager,
  GetOneSuccessManager,
  CreateSuccessManager,
  UpdateSuccessManager,
  DeleteSuccessManager,
  DeleteErrorManager,
  UpdateErrorManager,
  CreateErrorManager,
  GetOneErrorManager,
  GetAllErrorManager
} from '../../redux/redux';
 *     this.instance = new Store;
    this.instance.register(new StateStore('collection',
      new CollectionState(new CollectionData), [
        new GetAllManager, new GetAllPendingManager, new GetAllSuccessManager, new GetAllErrorManager,
        new GetOneManager, new GetOnePendingManager, new GetOneSuccessManager, new GetOneErrorManager,
        new CreateManager, new CreatePendingManager, new CreateSuccessManager, new CreateErrorManager,
        new UpdateManager, new UpdatePendingManager, new UpdateSuccessManager, new UpdateErrorManager,
        new DeleteManager, new DeletePendingManager, new DeleteSuccessManager, new DeleteErrorManager
      ])
    );
 */

import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { delay } from "rxjs/operators";

/** */

export abstract class State<T> {
  constructor(public data: T) { }
  clone(): State<T> {
    const clone = Object.create(Object.getPrototypeOf(this));
    (<State<T>>clone).data = JSON.parse(JSON.stringify(this.data));
    return <State<T>>clone;
  }
}

export abstract class Action<U> {
  constructor(public type: string, public value?: U) {}
}

export abstract class ActionManager<T, U = void> {
  constructor(public type: string, public providers?: {[name: string]: Injectable}) {}
  reduce(data: T, action?: Action<U>): T {
    return data;
  }
  affect(action: Action<U>, store: Store): void {
    console.log('Affect: ', action);
  }
}

/** */

export class StateStore<T> {
  store: Store;
  subject: BehaviorSubject<T>;
  actionsManagers: {[type: string]: ActionManager<T, any>};
  constructor(public selector: string, public state: State<T>, actionManagers: ActionManager<T, any>[]) {
    this.subject = new BehaviorSubject(this.state.data);
    this.actionsManagers = {};
    actionManagers.forEach(actionManager => this.actionsManagers[actionManager.type] = actionManager);
  }
  select(): Observable<T> {
    return this.subject.asObservable();
  }
  dispatch<U>(action: Action<U>) {
    const state = this.state.clone();
    state.data = this.actionsManagers[action.type].reduce(state.data, action);
    this.state = state;
    this.subject.next(this.state.data);
    this.actionsManagers[action.type].affect(action, this.store);
  }
}

export class Store {
  private selectors: {[selector: string]: StateStore<any>};
  constructor() {
    this.selectors = {};
  }
  register<T>(store: StateStore<T>) {
    store.store = this;
    this.selectors[store.selector] = store;
  }
  select<T>(selector: string): Observable<T> {
    return this.selectors[selector].select();
  }
  dispatch<U>(selector: string, action: Action<U>) {
    this.selectors[selector].dispatch(action);
  }
}


/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */

export class CollectionData {
  constructor(
    public all: any[] = undefined,
    public one: any = undefined,
    public created: any = undefined,
    public updated: any = undefined,
    public deleted: any = undefined,
    public allPending: boolean = false,
    public onePending: boolean = false,
    public createdPending: boolean = false,
    public updatedPending: boolean = false,
    public deletedPending: boolean = false,
    public allError: Error = undefined,
    public oneError: Error = undefined,
    public createdError: Error = undefined,
    public updatedError: Error = undefined,
    public deletedError: Error = undefined,
  ) { }
}
export class CollectionState extends State<CollectionData> { };
export enum CollectionActionsTypes {
  getAll = 'getAll',
  getAllPending = 'getAllPending',
  getAllSuccess = 'getAllSuccess',
  getAllError = 'getAllError',
  getOne = 'getOne',
  getOnePending = 'getOnePending',
  getOneSuccess = 'getOneSuccess',
  getOneError = 'getOneError',
  create = 'create',
  createPending = 'createPending',
  createSuccess = 'createSuccess',
  createError = 'createError',
  update = 'update',
  updatePending = 'updatePending',
  updateSuccess = 'updateSuccess',
  updateError = 'updateError',
  delete = 'delete',
  deletePending = 'deletePending',
  deleteSuccess = 'deleteSuccess',
  deleteError = 'deleteError',
};
export class GetAllAction extends Action<void> {constructor() {super(CollectionActionsTypes.getAll);}};
export class GetAllActionPending extends Action<void> {constructor() {super(CollectionActionsTypes.getAllPending);}};
export class GetAllActionSuccess extends Action<any[]> {constructor(value: any[]) {super(CollectionActionsTypes.getAllSuccess, value);}};
export class GetAllActionError extends Action<{error: Error}> {constructor(value: {error: Error}) {super(CollectionActionsTypes.getAllError, value);}};
export class GetOneAction extends Action<{id: string}> {constructor(value: {id: string}) {super(CollectionActionsTypes.getOne, value);}};
export class GetOneActionPending extends Action<void> {constructor() {super(CollectionActionsTypes.getOnePending);}};
export class GetOneActionSuccess extends Action<any> {constructor(value: any) {super(CollectionActionsTypes.getOneSuccess, value);}};
export class GetOneActionError extends Action<{error: Error}> {constructor(value: {error: Error}) {super(CollectionActionsTypes.getOneError, value);}};
export class CreateAction extends Action<any> {constructor(value: any) {super(CollectionActionsTypes.create, value);}};
export class CreateActionPending extends Action<void> {constructor() {super(CollectionActionsTypes.createPending);}};
export class CreateActionSuccess extends Action<any> {constructor(value: any) {super(CollectionActionsTypes.createSuccess, value);}};
export class CreateActionError extends Action<{error: Error}> {constructor(value: {error: Error}) {super(CollectionActionsTypes.createError, value);}};
export class UpdateAction extends Action<{id: string, body: any}> {constructor(value: {id: string, body: any}) {super(CollectionActionsTypes.update, value);}};
export class UpdateActionPending extends Action<void> {constructor() {super(CollectionActionsTypes.updatePending);}};
export class UpdateActionSuccess extends Action<any> {constructor(value: any) {super(CollectionActionsTypes.updateSuccess, value);}};
export class UpdateActionError extends Action<{error: Error}> {constructor(value: {error: Error}) {super(CollectionActionsTypes.updateError, value);}};
export class DeleteAction extends Action<{id: string}> {constructor(value: {id: string}) {super(CollectionActionsTypes.delete, value);}};
export class DeleteActionPending extends Action<void> {constructor() {super(CollectionActionsTypes.deletePending);}};
export class DeleteActionSuccess extends Action<any> {constructor(value: any) {super(CollectionActionsTypes.deleteSuccess, value);}};
export class DeleteActionError extends Action<{error: Error}> {constructor(value: {error: Error}) {super(CollectionActionsTypes.deleteError, value);}};

class Http {
  collection = [
    {id: 'a', name: 'test 0'},
    {id: 'b', name: 'test 1'},
    {id: 'c', name: 'test 2'},
    {id: 'd', name: 'test 3'},
    {id: 'e', name: 'test 4'}
  ];
  get(url: string, ...args){
    let one;
    const last = url[url.length - 1];
    if (url === '/all') return Observable.of(this.collection).pipe(delay(1000));
    if (url.search('/one/') !== -1) return Observable.of({email: 'test@test'}).pipe(delay(1000));
    return Observable.of(args).pipe(delay(1000));
  }
  post(url, body, ...args){
    this.collection.push(body);
    return Observable.of(body).pipe(delay(1000));
  }
  put(url, body, ...args){
    const last = url[url.length - 1];
    const i = this.collection.findIndex(c => c.id === last);
    this.collection[i] = body;
    return Observable.of(body).pipe(delay(1000));
  }
  delete(url, ...args){
    const last = url[url.length - 1];
    this.collection = this.collection.filter(c => c.id !== last);
    return Observable.of(last).pipe(delay(1000));
  }
};
const http = new Http;

export class GetAllManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.getAll, { http }); }
  affect(action: GetAllAction, store: Store): void {
    store.dispatch('collection', new GetAllActionPending);
    (<Http>this.providers.http).get('/all').subscribe(
      (response: any[]) => store.dispatch('collection', new GetAllActionSuccess(response)),
      (error: Error) => store.dispatch('collection', new GetAllActionError({ error })),
    );
  }
};
export class GetAllPendingManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.getAllPending); }
  reduce(data: CollectionData, action: GetAllActionPending): CollectionData {
    data.allPending = true;
    return data;
  }
};
export class GetAllSuccessManager extends ActionManager<CollectionData, any> {
  constructor() { super(CollectionActionsTypes.getAllSuccess); }
  reduce(data: CollectionData, action: GetAllActionSuccess): CollectionData {
    data.all = action.value;
    data.allPending = false;
    return data;
  }
};
export class GetAllErrorManager extends ActionManager<CollectionData, {error: Error}> {
  constructor() { super(CollectionActionsTypes.getAllError); }
  reduce(data: CollectionData, action: GetAllActionError): CollectionData {
    data.allError = action.value.error;
    data.allPending = false;
    return data;
  }
};
export class GetOneManager extends ActionManager<CollectionData, {id: string}> {
  constructor() { super(CollectionActionsTypes.getOne, { http }); }
  affect(action: GetOneAction, store: Store): void {
    store.dispatch('collection', new GetOneActionPending);
    (<Http>this.providers.http).get('/one/'+action.value.id).subscribe(
      (response: any) => store.dispatch('collection', new GetOneActionSuccess(response)),
      (error: Error) => store.dispatch('collection', new GetOneActionError({ error })),
    );
  }
};
export class GetOnePendingManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.getOnePending); }
  reduce(data: CollectionData, action: GetOneActionPending): CollectionData {
    data.onePending = true;
    return data;
  }
};
export class GetOneSuccessManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.getOneSuccess); }
  reduce(data: CollectionData, action: GetOneActionSuccess): CollectionData {
    data.one = action.value;
    data.onePending = false;
    return data;
  }
};
export class GetOneErrorManager extends ActionManager<CollectionData, {error: Error}> {
  constructor() { super(CollectionActionsTypes.getOneError); }
  reduce(data: CollectionData, action: GetOneActionError): CollectionData {
    data.oneError = action.value.error;
    data.onePending = false;
    return data;
  }
};
export class CreateManager extends ActionManager<CollectionData, any> {
  constructor() { super(CollectionActionsTypes.create, { http }); }
  affect(action: CreateAction, store: Store): void {
    store.dispatch('collection', new CreateActionPending);
    (<Http>this.providers.http).post('/all', action.value).subscribe(
      (response: any) => store.dispatch('collection', new CreateActionSuccess(response)),
      (error: Error) => store.dispatch('collection', new CreateActionError({ error })),
    );
  }
};
export class CreatePendingManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.createPending); }
  reduce(data: CollectionData, action: CreateActionPending): CollectionData {
    data.createdPending = true;
    return data;
  }
};
export class CreateSuccessManager extends ActionManager<CollectionData, any> {
  constructor() { super(CollectionActionsTypes.createSuccess); }
  reduce(data: CollectionData, action: CreateActionSuccess): CollectionData {
    data.created = action.value;
    data.createdPending = false;
    return data;
  }
};
export class CreateErrorManager extends ActionManager<CollectionData, {error: Error}> {
  constructor() { super(CollectionActionsTypes.createError); }
  reduce(data: CollectionData, action: CreateActionError): CollectionData {
    data.createdError = action.value.error;
    data.createdPending = false;
    return data;
  }
};
export class UpdateManager extends ActionManager<CollectionData, {id: string, body: any}> {
  constructor() { super(CollectionActionsTypes.update, { http }); }
  affect(action: UpdateAction, store: Store): void {
    store.dispatch('collection', new UpdateActionPending);
    (<Http>this.providers.http).put('/one/'+action.value.id, action.value.body).subscribe(
      (response: any) => store.dispatch('collection', new UpdateActionSuccess(response)),
      (error: Error) => store.dispatch('collection', new UpdateActionError({ error })),
    );
  }
};
export class UpdatePendingManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.updatePending); }
  reduce(data: CollectionData, action: UpdateActionPending): CollectionData {
    data.updatedPending = true;
    return data;
  }
};
export class UpdateSuccessManager extends ActionManager<CollectionData, any> {
  constructor() { super(CollectionActionsTypes.updateSuccess); }
  reduce(data: CollectionData, action: UpdateActionSuccess): CollectionData {
    data.updated = action.value;
    data.updatedPending = false;
    return data;
  }
};
export class UpdateErrorManager extends ActionManager<CollectionData, {error: Error}> {
  constructor() { super(CollectionActionsTypes.updateError); }
  reduce(data: CollectionData, action: UpdateActionError): CollectionData {
    data.updatedError = action.value.error;
    data.updatedPending = false;
    return data;
  }
};
export class DeleteManager extends ActionManager<CollectionData, {id: string}> {
  constructor() { super(CollectionActionsTypes.delete, { http }); }
  affect(action: DeleteAction, store: Store): void {
    store.dispatch('collection', new DeleteActionPending);
    (<Http>this.providers.http).delete('/delete/'+action.value.id).subscribe(
      (response: any) => store.dispatch('collection', new DeleteActionSuccess(response)),
      (error: Error) => store.dispatch('collection', new DeleteActionError({ error })),
    );
  }
};
export class DeletePendingManager extends ActionManager<CollectionData> {
  constructor() { super(CollectionActionsTypes.deletePending); }
  reduce(data: CollectionData, action: DeleteActionPending): CollectionData {
    data.deletedPending = true;
    return data;
  }
};
export class DeleteSuccessManager extends ActionManager<CollectionData, any> {
  constructor() { super(CollectionActionsTypes.deleteSuccess); }
  reduce(data: CollectionData, action: DeleteActionSuccess): CollectionData {
    data.deleted = action.value;
    data.deletedPending = false;
    return data;
  }
};
export class DeleteErrorManager extends ActionManager<CollectionData, {error: Error}> {
  constructor() { super(CollectionActionsTypes.deleteError); }
  reduce(data: CollectionData, action: DeleteActionError): CollectionData {
    data.deletedError = action.value.error;
    data.deletedPending = false;
    return data;
  }
};


/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */


export function sampleAppFactory() {

  /** Definitions */
  class SampleData {
    constructor(
      public theme: string = 'default',
      public online: boolean = true,
      public firstVisit: boolean = true
    ) { }
  };
  class SampleState extends State<SampleData> { };
  enum SampleActionsTypes {
    resetTheme = 'reset theme',
    changeTheme = 'change theme',
    online = 'set online',
    offline = 'set offline',
  };
  class ResetThemeAction extends Action<void> {constructor() {super(SampleActionsTypes.resetTheme);}};
  class ChangeThemeAction extends Action<{theme: string}> {constructor(value: {theme: string}) {super(SampleActionsTypes.changeTheme, value);}};
  class OnlineAction extends Action<void> {constructor() { super(SampleActionsTypes.online);}};
  class OfflineAction extends Action<void> {constructor() {super(SampleActionsTypes.offline);}};
  class ResetThemeManager extends ActionManager<SampleData> {
    constructor() { super(SampleActionsTypes.resetTheme); }
    reduce(data: SampleData, action: ResetThemeAction): SampleData {
      data.theme = 'default';
      return data;
    }
  };
  class ChangeThemeManager extends ActionManager<SampleData, {theme: string}> {
    constructor() { super(SampleActionsTypes.changeTheme); }
    reduce(data: SampleData, action: ChangeThemeAction): SampleData {
      data.theme = action.value.theme;
      return data;
    }
  };
  class OnlineManager extends ActionManager<SampleData> {
    constructor() { super(SampleActionsTypes.online); }
    reduce(data: SampleData, action: OnlineAction): SampleData {
      data.online = true;
      return data;
    }
  };
  class OfflineManager extends ActionManager<SampleData> {
    constructor() { super(SampleActionsTypes.offline); }
    reduce(data: SampleData, action: OfflineAction): SampleData {
      data.online = false;
      return data;
    }
  };
  /** */

  /** sample app init step */

  return function sampleApp() {
    const store = new Store;
    store.register(new StateStore('sample',
      new SampleState(new SampleData), [
        new ResetThemeManager,
        new ChangeThemeManager,
        new OnlineManager,
        new OfflineManager
      ]
    ));
    store.register(new StateStore('collection',
      new CollectionState(new CollectionData), [
        new GetAllManager, new GetAllPendingManager, new GetAllSuccessManager, new GetAllErrorManager,
        new GetOneManager, new GetOnePendingManager, new GetOneSuccessManager, new GetOneErrorManager,
        new CreateManager, new CreatePendingManager, new CreateSuccessManager, new CreateErrorManager,
        new UpdateManager, new UpdatePendingManager, new UpdateSuccessManager, new UpdateErrorManager,
        new DeleteManager, new DeletePendingManager, new DeleteSuccessManager, new DeleteErrorManager
      ]
    ));

    /** ex: ComponentA */
    {
      /*
      store.select('sample').subscribe((data: SampleData) => console.log('componentA, sample: '+JSON.stringify(data)));
      store.select('collection').subscribe((data: CollectionData) => console.log('componentA, collection: '+JSON.stringify(data)));
      setTimeout(() => {
        console.log('Component A dispatch changeThemeAction {theme: "light"} at 1000');
        store.dispatch('sample', new ChangeThemeAction({theme: 'light'}));
      }, 1000);
      setTimeout(() => {
        console.log('Component A dispatch changeThemeAction {theme: "dark"} at 10000');
        store.dispatch('sample', new ChangeThemeAction({theme: 'dark'}));
      }, 10000);
      */
    };


    let one;
    /** ex: ComponentB */
    {
      store.select('sample').subscribe((data: SampleData) => console.log('componentB, sample: '+JSON.stringify(data)));
      store.select('collection').subscribe((data: CollectionData) => {
        console.log('componentB, collection: '+JSON.stringify(data));
        one = data.one ? data.one : data.all[data.all.length - 2];
      });
      setTimeout(() => {
        console.log('Component B dispatch getAll at 2000');
        store.dispatch('collection', new GetAllAction);
      }, 2000);
      setTimeout(() => {
        console.log('Component B dispatch getOne at 4000');
        store.dispatch('collection', new GetOneAction({id: one.id}));
      }, 4000);
      setTimeout(() => {
        console.log('Component B dispatch Update at 6000');
        store.dispatch('collection', new UpdateAction({id: one.id, body: one.name+' UPDATED'}));
      }, 6000);
    };

    /** ex: ComponentC */
    {
      store.select('sample').subscribe((data: SampleData) => console.log('componentC, sample: '+JSON.stringify(data)));
      store.select('collection').subscribe((data: CollectionData) => console.log('componentC, collection: '+JSON.stringify(data)));
      setTimeout(() => {
        console.log('Component C dispatch delete at 9000');
        store.dispatch('collection', new DeleteAction({id: one.id}));
      }, 9000);
    };

  }

}

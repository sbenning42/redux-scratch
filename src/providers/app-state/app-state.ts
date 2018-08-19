import { Injectable } from '@angular/core';
import { State } from '../../models/state';
import { Action } from '../../models/action';
import { Reducer } from '../../models/reducer';
import { Effect } from '../../models/effect';
import { Store } from '../../models/store';
import { StoreProvider } from '../store/store';

export const appSelector = 'app';

export class AppData {
  constructor(
    public step: number,
    public theme: string
  ) {}
}

export class AppState extends State<AppData> {
  constructor(data: AppData) {
    super(data);
  }
}

export enum AppActionType {
  updateStep = '[app] Update step',
  updateTheme = '[app] Update theme',
}

export class AppUpdateStepValue {
  constructor(public step: number) {}
}

export class AppUpdateThemeValue {
  constructor(public theme: string) {}
}

export class AppUpdateStepAction extends Action  {
  constructor(public value: AppUpdateStepValue) {
    super(appSelector, AppActionType.updateStep);
  }
}

export class AppUpdateThemeAction extends Action  {
  constructor(public value: AppUpdateThemeValue) {
    super(appSelector, AppActionType.updateTheme);
  }
}

export class AppReducer extends Reducer<AppState> {

  switchActionType = {};

  constructor() {
    super();
    this.switchActionType[AppActionType.updateStep] = (action: AppUpdateStepAction, state: AppState) => this.updateStep(action, state);
    this.switchActionType[AppActionType.updateTheme] = (action: AppUpdateThemeAction, state: AppState) => this.updateTheme(action, state);
  }

  private updateStep(action: AppUpdateStepAction, state: AppState): AppState {
    state.data.step = action.value.step;
    return state;
  }

  private updateTheme(action: AppUpdateThemeAction, state: AppState): AppState {
    state.data.theme = action.value.theme;
    return state;
  }

  reduce(action: Action, state: AppState): AppState {
    return this.switchActionType[action.type](action, state);
  }

}

export class AppEffect extends Effect {

  switchActionType = {};

  constructor() {
    super();
    this.switchActionType[AppActionType.updateStep] = (action: AppUpdateStepAction, store: Store) => this.updateStep(action, store);
    this.switchActionType[AppActionType.updateTheme] = (action: AppUpdateThemeAction, store: Store) => this.updateTheme(action, store);
  }

  private updateStep(action: AppUpdateStepAction, store: Store): void {
    console.log('Step updated to: ', action.value.step);
  }

  private updateTheme(action: AppUpdateThemeAction, store: Store): void {
    console.log('Theme updated to: ', action.value.theme);
  }

  apply(action: Action, store: Store): void {
    this.switchActionType[action.type](action, store);
  }

}

/*
  Generated class for the AppStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppStateProvider {

  private state: {[selector: string]: AppState} = {};
  private reducer: {[selector: string]: AppReducer} = {};
  private effect: {[selector: string]: AppEffect} = {};

  constructor(public store: StoreProvider) {
    console.log('Hello AppStateProvider Provider');
    this.state[appSelector] = new AppState(new AppData(0, 'dark'));
    this.reducer[appSelector] = new AppReducer;
    this.effect[appSelector] = new AppEffect;
    this.store.combine(this.state);
    this.store.registerReducers(this.reducer);
    this.store.registerEffects(this.effect);
    console.log(this.store.store);
  }

}

    // const auth = new State({is: false, pending: false, error: undefined, prefix: 'Bearer ', token: '', credentials: {login: '', password: ''}});

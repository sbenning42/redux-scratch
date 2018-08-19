import { Injectable } from '@angular/core';
import { State } from '../../models/state';
import { Action } from '../../models/action';
import { Reducer } from '../../models/reducer';
import { Effect } from '../../models/effect';
import { Store } from '../../models/store';
import { StoreProvider } from '../store/store';
import { AuthProvider, LoginResponseBody } from '../auth/auth';
import { OverlayProvider } from '../overlay/overlay';

export const authSelector = 'auth';

export class AuthData {
  constructor(
    public credentials: {login: string, password: string},
    public authentified: boolean,
    public loginPending: boolean,
    public logoutPending: boolean,
    public loginError: Error,
    public logoutError: Error,
    public prefix: string,
    public token: string
  ) {}
}

export class AuthState extends State<AuthData> {
  constructor(data: AuthData) {
    super(data);
  }
}

export enum AuthActionType {
  login = '[auth] Login',
  loginPending = '[auth] Login Pending',
  loginSuccess = '[auth] Login Success',
  loginError = '[auth] Login Error',
  logout = '[auth] Logout',
  logoutPending = '[auth] Logout Pending',
  logoutSuccess = '[auth] Logout Success',
  logoutError = '[auth] Logout Error',
}

export class AuthLoginValue {
  constructor(public credentials: {login: string, password: string}) {}
}
export class AuthLoginAction extends Action  {
  constructor(public value: AuthLoginValue) {
    super(authSelector, AuthActionType.login);
  }
}

export class AuthLoginPendingValue {
  constructor() {}
}
export class AuthLoginPendingAction extends Action  {
  constructor(public value: AuthLoginPendingValue) {
    super(authSelector, AuthActionType.loginPending);
  }
}

export class AuthLoginSuccessValue {
  constructor(public body: LoginResponseBody) {}
}
export class AuthLoginSuccessAction extends Action  {
  constructor(public value: AuthLoginSuccessValue) {
    super(authSelector, AuthActionType.loginSuccess);
  }
}

export class AuthLoginErrorValue {
  constructor(public error: Error) {
  }
}
export class AuthLoginErrorAction extends Action  {
  constructor(public value: AuthLoginErrorValue) {
    super(authSelector, AuthActionType.loginError);
  }
}

export class AuthLogoutValue {
  constructor() {}
}
export class AuthLogoutAction extends Action  {
  constructor(public value: AuthLogoutValue) {
    super(authSelector, AuthActionType.logout);
  }
}

export class AuthLogoutPendingValue {
  constructor() {}
}
export class AuthLogoutPendingAction extends Action  {
  constructor(public value: AuthLogoutPendingValue) {
    super(authSelector, AuthActionType.logoutPending);
  }
}

export class AuthLogoutSuccessValue {
  constructor() {}
}
export class AuthLogoutSuccessAction extends Action  {
  constructor(public value: AuthLogoutSuccessValue) {
    super(authSelector, AuthActionType.logoutSuccess);
  }
}

export class AuthLogoutErrorValue {
  constructor(public error: Error) {}
}
export class AuthLogoutErrorAction extends Action  {
  constructor(public value: AuthLogoutErrorValue) {
    super(authSelector, AuthActionType.logoutError);
  }
}

export class AuthReducer extends Reducer<AuthState> {

  switchActionType = {};

  constructor() {
    super();
    this.switchActionType[AuthActionType.login] = (action: AuthLoginAction, state: AuthState) => this.login(action, state);
    this.switchActionType[AuthActionType.logout] = (action: AuthLogoutAction, state: AuthState) => state;
    this.switchActionType[AuthActionType.loginPending] = (action: AuthLoginPendingAction, state: AuthState) => this.loginPending(action, state);
    this.switchActionType[AuthActionType.loginSuccess] = (action: AuthLoginSuccessAction, state: AuthState) => this.loginSuccess(action, state);
    this.switchActionType[AuthActionType.loginError] = (action: AuthLoginErrorAction, state: AuthState) => this.loginError(action, state);
    this.switchActionType[AuthActionType.logoutPending] = (action: AuthLogoutPendingAction, state: AuthState) => this.logoutPending(action, state);
    this.switchActionType[AuthActionType.logoutSuccess] = (action: AuthLogoutSuccessAction, state: AuthState) => this.logoutSuccess(action, state);
    this.switchActionType[AuthActionType.logoutError] = (action: AuthLogoutErrorAction, state: AuthState) => this.logoutError(action, state);
  }

  private login(action: AuthLoginAction, state: AuthState): AuthState {
    state.data.credentials = action.value.credentials;
    return state;
  }

  private loginPending(action: AuthLoginPendingAction, state: AuthState): AuthState {
    state.data.loginPending = true;
    return state;
  }

  private loginSuccess(action: AuthLoginSuccessAction, state: AuthState): AuthState {
    state.data.authentified = true;
    state.data.token = action.value.body.token;
    state.data.loginPending = false;
    return state;
  }

  private loginError(action: AuthLoginErrorAction, state: AuthState): AuthState {
    state.data.authentified = false;
    state.data.token = undefined;
    state.data.loginPending = false;
    state.data.loginError = action.value.error;
    return state;
  }

  private logoutPending(action: AuthLogoutAction, state: AuthState): AuthState {
    state.data.logoutPending = true;
    return state;
  }

  private logoutSuccess(action: AuthLogoutSuccessAction, state: AuthState): AuthState {
    state.data.authentified = false;
    state.data.token = undefined;
    state.data.logoutPending = false;
    return state;
  }

  private logoutError(action: AuthLogoutErrorAction, state: AuthState): AuthState {
    state.data.logoutPending = false;
    state.data.logoutError = action.value.error;
    return state;
  }

  reduce(action: Action, state: AuthState): AuthState {
    return this.switchActionType[action.type](action, state);
  }

}

export class AuthEffect extends Effect {

  switchActionType = {};

  constructor(public authProvider: AuthProvider, public overlayProvider: OverlayProvider) {
    super();
    this.switchActionType[AuthActionType.login] = (action: AuthLoginAction, store: Store) => this.login(action, store);
    this.switchActionType[AuthActionType.logout] = (action: AuthLogoutAction, store: Store) => this.logout(action, store);
    this.switchActionType[AuthActionType.loginPending] = (action: AuthLoginPendingAction, store: Store) => this.loginPending(action, store);
    this.switchActionType[AuthActionType.loginSuccess] = (action: AuthLoginSuccessAction, store: Store) => this.loginSuccess(action, store);
    this.switchActionType[AuthActionType.loginError] = (action: AuthLoginErrorAction, store: Store) => this.loginError(action, store);
    this.switchActionType[AuthActionType.logoutPending] = (action: AuthLogoutPendingAction, store: Store) => this.logoutPending(action, store);
    this.switchActionType[AuthActionType.logoutSuccess] = (action: AuthLogoutSuccessAction, store: Store) => this.logoutSuccess(action, store);
    this.switchActionType[AuthActionType.logoutError] = (action: AuthLogoutErrorAction, store: Store) => this.logoutError(action, store);
  }

  private login(action: AuthLoginAction, store: Store): void {
    store.dispatch(new AuthLoginPendingAction(new AuthLoginPendingValue));
    this.authProvider.login(action.value.credentials).subscribe(
      (response: LoginResponseBody) => store.dispatch(new AuthLoginSuccessAction(new AuthLoginSuccessValue(response))),
      (error: Error) => store.dispatch(new AuthLoginErrorAction(new AuthLoginErrorValue({name: error.name, message: error.message})))
    );
  }

  private loginPending(action: AuthLoginPendingAction, store: Store): void {
    this.overlayProvider.createLoading({content: 'Login en cours ...'});
    this.overlayProvider.presentLoading();
  }

  private loginSuccess(action: AuthLoginSuccessAction, store: Store): void {
    this.overlayProvider.dismissLoading();
  }

  private loginError(action: AuthLoginErrorAction, store: Store): void {
    this.overlayProvider.dismissLoading();
    this.overlayProvider.createAlrt({
      title: action.value.error.name,
      message: action.value.error.message,
      buttons: [{text: 'Ok'}]
    });
    this.overlayProvider.presentAlrt();
  }

  private logout(action: AuthLogoutAction, store: Store): void {
    store.dispatch(new AuthLogoutPendingAction(new AuthLogoutPendingValue));
    this.authProvider.logout().subscribe(
      () => store.dispatch(new AuthLogoutSuccessAction(new AuthLogoutSuccessValue)),
      (error: Error) => store.dispatch(new AuthLoginErrorAction(new AuthLoginErrorValue(error)))
    );
  }

  logoutPending(action: AuthLogoutPendingAction, store: Store): void {}

  logoutSuccess(action: AuthLogoutSuccessAction, store: Store): void {}

  logoutError(action: AuthLogoutErrorAction, store: Store): void {}

  apply(action: Action, store: Store): void {
    this.switchActionType[action.type](action, store);
  }

}

/*
  Generated class for the AuthStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthStateProvider {

  private state: {[selector: string]: AuthState} = {};
  private reducer: {[selector: string]: AuthReducer} = {};
  private effect: {[selector: string]: AuthEffect} = {};

  constructor(public store: StoreProvider, public authProvider: AuthProvider, public overlayProvider: OverlayProvider) {
    console.log('Hello AuthStateProvider Provider');
    this.state[authSelector] = new AuthState(new AuthData({login: '', password: ''}, false, false, false, undefined, undefined, 'Bearer ', undefined));
    this.reducer[authSelector] = new AuthReducer;
    this.effect[authSelector] = new AuthEffect(authProvider, overlayProvider);
    this.store.combine(this.state);
    this.store.registerReducers(this.reducer);
    this.store.registerEffects(this.effect);
    console.log(this.store.store);
  }

}

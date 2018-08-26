import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
    AppState,
    initialAppState
} from './app-redux/app-state';
import {
    AppSetNameAction,
    AppSetVersionAction,
    AppActions
} from './app-redux/app-actions';
import {
    appReducer
} from './app-redux/app-reducer';
// import { AppEffects } from './app-redux/app-effect';
import {
    AppReduxService
} from './app-redux/app-redux.service';

import {
    AuthState,
    initialAuthState
} from './auth-redux/auth-state';
import {
    AuthActions,
    AuthLoginAction,
    AuthLoginPendingAction,
    AuthLoginSuccessAction,
    AuthLoginErrorAction
} from './auth-redux/auth-actions';
import {
    authReducer
} from './auth-redux/auth-reducer';
import {
    AuthEffects,
    AuthService
} from './auth-redux/auth-effect';
import {
    AuthReduxService
} from './auth-redux/auth-redux.service';

import {
    User,
    UserState,
    initialUserState
} from './user-redux/user-state';
import {
    UserActions,
    UserFetchAction,
    UserFetchPendingAction,
    UserFetchSuccessAction,
    UserFetchErrorAction
} from './user-redux/user-actions';
import {
    userReducer
} from './user-redux/user-reducer';
import {
    UserEffects,
    UserService
} from './user-redux/user-effect';
import {
    UserReduxService
} from './user-redux/user-redux.service';

export {
    AppState,
    initialAppState
} from './app-redux/app-state';
export {
    AppSetNameAction,
    AppSetVersionAction,
    AppActions
} from './app-redux/app-actions';
export {
    appReducer
} from './app-redux/app-reducer';
// export { AppEffects } from './app-redux/app-effect';
export {
    AppReduxService
} from './app-redux/app-redux.service';

export {
    AuthState,
    initialAuthState
} from './auth-redux/auth-state';
export {
    AuthActions,
    AuthLoginAction,
    AuthLoginPendingAction,
    AuthLoginSuccessAction,
    AuthLoginErrorAction
} from './auth-redux/auth-actions';
export {
    authReducer
} from './auth-redux/auth-reducer';
export {
    AuthEffects,
    AuthService
} from './auth-redux/auth-effect';
export {
    AuthReduxService
} from './auth-redux/auth-redux.service';

export {
    User,
    UserState,
    initialUserState
} from './user-redux/user-state';
export {
    UserActions,
    UserFetchAction,
    UserFetchPendingAction,
    UserFetchSuccessAction,
    UserFetchErrorAction
} from './user-redux/user-actions';
export {
    userReducer
} from './user-redux/user-reducer';
export {
    UserEffects,
    UserService
} from './user-redux/user-effect';
export {
    UserReduxService
} from './user-redux/user-redux.service';

export const appStateSelector = 'appState';
export const authStateSelector = 'authState';
export const userStateSelector = 'userState';

export const stateChanged = distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y));
export const ofType = (type: string) => filter((action: Action) => action.type === type);
export const ofTypes = (types: string[]) => filter((action: Action) => types.some(type => type === action.type));
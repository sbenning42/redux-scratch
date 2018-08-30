import { Store, Action, ActionReducerMap } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AppMetadataStore {
    name: string;
    version: string;
}
export enum AppMetadataActionType {
    setName = 'APP_METADATA_SET_NAME_ACTION',
    setVersion = 'APP_METADATA_SET_VERSION_ACTION',
}
export class AppMetadataSetNameAction implements Action {
    type = AppMetadataActionType.setName;
    constructor(public name: string) {}
}
export class AppMetadataSetVersionAction implements Action {
    type = AppMetadataActionType.setVersion;
    constructor(public version: string) {}
}
export type AppMetadataActions = AppMetadataSetNameAction
|AppMetadataSetVersionAction;
export const initialAppMetadataStore: AppMetadataStore = {
    name: 'My App',
    version: '1.0.0'
};
export function appMetadataReducer(state: AppMetadataStore = initialAppMetadataStore, action: AppMetadataActions): AppMetadataStore {
    switch (action.type) {
        case AppMetadataActionType.setName:
            return {...state, name: (<AppMetadataSetNameAction>action).name};
        case AppMetadataActionType.setVersion:
            return {...state, version: (<AppMetadataSetVersionAction>action).version};
        default:
            return state;
    }
}

/******************************************************************************************************* */

export enum AppNetworkStatuses {
    online = 'APP_NETWORK_STATUS_ONLINE',
    offline = 'APP_NETWORK_STATUS_OFFLINE',
    unknow = 'APP_NETWORK_STATUS_UNKNOW'
}
export enum AppProcessStatuses {
    off = 'APP_PROCESS_STATUS_OFF',
    ready = 'APP_PROCESS_STATUS_READY',
    loading = 'APP_PROCESS_STATUS_LOADING',
}
export interface AppStatusStore {
    network: string;
    process: string;
}
export enum AppStatusActionType {
    setNetworkUnknow = 'APP_STATUS_SET_NETWORK_UNKNOW',
    setNetworkOnline = 'APP_STATUS_SET_NETWORK_ONLINE',
    setNetworkOffline = 'APP_STATUS_SET_NETWORK_OFFLINE',
    setProcessOff = 'APP_STATUS_SET_PROCESS_OFF',
    setProcessReady = 'APP_STATUS_SET_PROCESS_READY',
    setProcessLoading = 'APP_STATUS_SET_PROCESS_LOADING',
}
export class AppStatusSetNetworkUnknowAction implements Action {
    type = AppStatusActionType.setNetworkUnknow;
}
export class AppStatusSetNetworkOnlineAction implements Action {
    type = AppStatusActionType.setNetworkOnline;
}
export class AppStatusSetNetworkOfflineAction implements Action {
    type = AppStatusActionType.setNetworkOffline;
}
export class AppStatusSetProcessOffAction implements Action {
    type = AppStatusActionType.setProcessOff;
}
export class AppStatusSetProcessReadyAction implements Action {
    type = AppStatusActionType.setProcessReady;
}
export class AppStatusSetProcessLoadingAction implements Action {
    type = AppStatusActionType.setProcessLoading;
}
export type AppStatusActions = AppStatusSetNetworkUnknowAction
|AppStatusSetNetworkOnlineAction
|AppStatusSetNetworkOfflineAction
|AppStatusSetProcessOffAction
|AppStatusSetProcessReadyAction
|AppStatusSetProcessLoadingAction;
export const initialAppStatusStore: AppStatusStore = {
    network: AppNetworkStatuses.unknow,
    process: AppProcessStatuses.off
};
export function appStatusReducer(state: AppStatusStore = initialAppStatusStore, action: AppStatusActions): AppStatusStore {
    switch (action.type) {
        case AppStatusActionType.setNetworkUnknow:
            return {...state, network: AppNetworkStatuses.unknow};
        case AppStatusActionType.setNetworkOnline:
            return {...state, network: AppNetworkStatuses.online};
        case AppStatusActionType.setNetworkOffline:
            return {...state, network: AppNetworkStatuses.offline};
        case AppStatusActionType.setProcessOff:
            return {...state, process: AppProcessStatuses.off};
        case AppStatusActionType.setProcessReady:
            return {...state, process: AppProcessStatuses.ready};
        case AppStatusActionType.setProcessLoading:
            return {...state, process: AppProcessStatuses.loading};
        default:
            return state;
    }
}

/******************************************************************************************************* */

export class StoreError {
    constructor(public type: string, public error: string) {}
}
export interface AppErrorStore {
    lastError: StoreError;
    errorStack: StoreError[];
}
export enum AppErrorActionType {
    setError = 'APP_ERROR_SET_ERROR_ACTION',
    unsetError = 'APP_ERROR_UNSET_ERROR_ACTION',
    flushErrorStack = 'APP_ERROR_FLUSH_ERROR_STACK_ACTION',
}
export class AppErrorSetErrorAction implements Action {
    type = AppErrorActionType.setError;
    constructor(public error: StoreError) {}
}
export class AppErrorUnsetErrorAction implements Action {
    type = AppErrorActionType.unsetError;
}
export class AppErrorFlushErrorStackAction implements Action {
    type = AppErrorActionType.flushErrorStack;
}
export type AppErrorActions = AppErrorSetErrorAction
|AppErrorUnsetErrorAction
|AppErrorFlushErrorStackAction;
export const initialAppErrorStore: AppErrorStore = {
    lastError: undefined,
    errorStack: []
};
export function appErrorReducer(state: AppErrorStore = initialAppErrorStore, action: AppErrorActions): AppErrorStore {
    switch (action.type) {
        case AppErrorActionType.setError:
            const errorStack = [...state.errorStack, (<AppErrorSetErrorAction>action).error];
            return {...state, errorStack, lastError: (<AppErrorSetErrorAction>action).error};
        case AppErrorActionType.unsetError:
            return {...state, lastError: undefined};
        case AppErrorActionType.flushErrorStack:
            return {...state, errorStack: []};
        default:
            return state;
    }
}

/******************************************************************************************************* */

export class UserCredentials {
    constructor(public login: string, public password: string) {}
}
export interface UserMetadataStore {
    firstTime: boolean;
    authentified: boolean;
    credentials: UserCredentials;
    user: any;
}
export enum UserMetadataActionType {
    setFirstTime = 'USER_METADATA_SET_FIRST_TIME_ACTION',
    setAlready = 'USER_METADATA_SET_ALREADY_ACTION',
    setCredentials = 'USER_METADATA_SET_CREDENTIALS_ACTION',
    unsetCredentials = 'USER_METADATA_UNSET_CREDENTIALS_ACTION',
    authentifyRequest = 'USER_METADATA_AUTHENTIFY_REQUEST_ACTION',
    authentifySuccess = 'USER_METADATA_AUTHENTIFY_SUCCESS_ACTION',
}
export class UserMetadataSetFirstTimeAction implements Action {
    type = UserMetadataActionType.setFirstTime;
}
export class UserMetadataSetAlreadyAction implements Action {
    type = UserMetadataActionType.setAlready;
}
export class UserMetadataSetCredentialsAction implements Action {
    type = UserMetadataActionType.setCredentials;
    constructor(public credentials: UserCredentials) {}
}
export class UserMetadataUnsetCredentialsAction implements Action {
    type = UserMetadataActionType.unsetCredentials;
}
export class UserMetadataAuthentifyRequestAction implements Action {
    type = UserMetadataActionType.authentifyRequest;
}
export class UserMetadataAuthentifySuccessAction implements Action {
    type = UserMetadataActionType.authentifySuccess;
    constructor(public user: any) {}
}
export type UserMetadataActions = UserMetadataSetFirstTimeAction
|UserMetadataSetAlreadyAction
|UserMetadataSetCredentialsAction
|UserMetadataUnsetCredentialsAction
|UserMetadataAuthentifyRequestAction
|UserMetadataAuthentifySuccessAction
export const initialUserMetadataStore: UserMetadataStore = {
    firstTime: true,
    authentified: false,
    credentials: undefined,
    user: undefined,
};
export function userMetadataReducer(state: UserMetadataStore = initialUserMetadataStore, action: UserMetadataActions): UserMetadataStore {
    switch (action.type) {
        case UserMetadataActionType.setFirstTime:
            return {...state, firstTime: true};
        case UserMetadataActionType.setAlready:
            return {...state, firstTime: false};
        case UserMetadataActionType.setCredentials:
            return {...state, credentials: (<UserMetadataSetCredentialsAction>action).credentials};
        case UserMetadataActionType.unsetCredentials:
            return {...state, credentials: undefined};
        case UserMetadataActionType.authentifySuccess:
            return {...state, authentified: true, user: (<UserMetadataAuthentifySuccessAction>action).user};
        case UserMetadataActionType.authentifyRequest:
        default:
            return state;
    }
}

/******************************************************************************************************* */

export interface CollectionStore<T=any> {
    collection: T[];
    fetched: boolean;
}

/******************************************************************************************************* */

export interface UserThemeStore extends CollectionStore { }
export enum UserThemeActionType {
    fetchRequest = 'USER_THEME_FETCH_REQUEST_ACTION',
    fetchSuccess = 'USER_THEME_FETCH_SUCCESS_ACTION',
}
export class UserThemeFetchRequestAction implements Action {
    type = UserThemeActionType.fetchRequest;
}
export class UserThemeFetchSuccessAction implements Action {
    type = UserThemeActionType.fetchSuccess;
    constructor(public themes: any[]) {}
}
export type UserThemeActions = UserThemeFetchRequestAction
|UserThemeFetchSuccessAction;
export const initialUserThemeStore: UserThemeStore = {
    collection: [],
    fetched: false
};
export function userThemeReducer(state: UserThemeStore = initialUserThemeStore, action: UserThemeActions): UserThemeStore {
    switch (action.type) {
        case UserThemeActionType.fetchSuccess:
            return {...state, collection: (<UserThemeFetchSuccessAction>action).themes, fetched: true};
        case UserThemeActionType.fetchRequest:
        default:
            return state;
    }
}

/******************************************************************************************************* */

export interface UserFavoriStore extends CollectionStore { };
export enum UserFavoriActionType {
    fetchRequest = 'USER_FAVORI_FETCH_REQUEST_ACTION',
    fetchSuccess = 'USER_FAVORI_FETCH_SUCCESS_ACTION',
}
export class UserFavoriFetchRequestAction implements Action {
    type = UserFavoriActionType.fetchRequest;
}
export class UserFavoriFetchSuccessAction implements Action {
    type = UserFavoriActionType.fetchSuccess;
    constructor(public favoris: any[]) {}
}
export type UserFavoriActions = UserFavoriFetchRequestAction
|UserFavoriFetchSuccessAction;
export const initialUserFavoriStore: UserFavoriStore = {
    collection: [],
    fetched: false
}
export function userFavoriReducer(state: UserFavoriStore = initialUserFavoriStore, action: UserFavoriActions): UserFavoriStore {
    switch (action.type) {
        case UserFavoriActionType.fetchSuccess:
            return {...state, collection: (<UserFavoriFetchSuccessAction>action).favoris, fetched: true};
        case UserFavoriActionType.fetchRequest:
        default:
            return state;
    }
}

/******************************************************************************************************* */

export interface AppProductStore extends CollectionStore { }
export enum AppProductActionType {
    fetchRequest = 'APP_PRODUCT_FETCH_REQUEST_ACTION',
    fetchSuccess = 'APP_PRODUCT_FETCH_SUCCESS_ACTION',
}
export class AppProductFetchRequestAction implements Action {
    type = AppProductActionType.fetchRequest;
}
export class AppProductFetchSuccessAction implements Action {
    type = AppProductActionType.fetchSuccess;
    constructor(public products: any[]) {}
}
export type AppProductActions = AppProductFetchRequestAction
|AppProductFetchSuccessAction;
export const initialAppProductStore: AppProductStore = {
    collection: [],
    fetched: false
};
export function appProductReducer(state: AppProductStore = initialAppProductStore, action: AppProductActions): AppProductStore {
    switch (action.type) {
        case AppProductActionType.fetchSuccess:
            return {...state, collection: (<AppProductFetchSuccessAction>action).products, fetched: true};
        case AppProductActionType.fetchRequest:
        default:
            return state;
    }
}

/******************************************************************************************************* */

export interface AppThemeStore extends CollectionStore { }
export enum AppThemeActionType {
    fetchRequest = 'APP_THEME_FETCH_REQUEST_ACTION',
    fetchSuccess = 'APP_THEME_FETCH_SUCCESS_ACTION',
}
export class AppThemeFetchRequestAction implements Action {
    type = AppThemeActionType.fetchRequest;
}
export class AppThemeFetchSuccessAction implements Action {
    type = AppThemeActionType.fetchSuccess;
    constructor(public themes: any[]) {}
}
export type AppThemeActions = AppThemeFetchRequestAction
|AppThemeFetchSuccessAction;
export const initialAppThemeStore: AppThemeStore = {
    collection: [],
    fetched: false
};
export function appThemeReducer(state: AppThemeStore = initialAppThemeStore, action: AppThemeActions): AppThemeStore {
    switch (action.type) {
        case AppThemeActionType.fetchSuccess:
            return {...state, collection: (<AppThemeFetchSuccessAction>action).themes, fetched: true};
        case AppThemeActionType.fetchRequest:
        default:
            return state;
    }
}

/******************************************************************************************************* */

export const appStore = {
    appMetadata: appMetadataReducer,
    appStatus: appStatusReducer,
    appError: appErrorReducer,
    userMetadata: userMetadataReducer,
    userTheme: userThemeReducer,
    userFavori: userFavoriReducer,
    appProduct: appProductReducer,
    appTheme: appThemeReducer,
};

/******************************************************************************************************* */

export class AppStoreManager {
    constructor(public store: Store<any>) {}
        
    selectAppMetadata(): Observable<AppMetadataStore> {
        return this.store.select('appMetadata');
    }        
    selectAppStatus(): Observable<AppStatusStore> {
        return this.store.select('appStatus');
    }        
    selectAppError(): Observable<AppErrorStore> {
        return this.store.select('appError');
    }        
    selectUserMetadata(): Observable<UserMetadataStore> {
        return this.store.select('userMetadata');
    }        
    selectUserTheme(): Observable<UserThemeStore> {
        return this.store.select('userTheme');
    }        
    selectUserFavori(): Observable<UserFavoriStore> {
        return this.store.select('userFavori');
    }        
    selectAppProduct(): Observable<AppProductStore> {
        return this.store.select('appProduct');
    }        
    selectAppTheme(): Observable<AppThemeStore> {
        return this.store.select('appTheme');
    }
    selectAll(): Observable<{type: string, state: any}> {
        return merge(
            this.selectAppError().pipe(map(state => ({type: 'appError', state}))),
            this.selectAppMetadata().pipe(map(state => ({type: 'appMetadata', state}))),
            this.selectAppProduct().pipe(map(state => ({type: 'appProduct', state}))),
            this.selectAppStatus().pipe(map(state => ({type: 'appStatus', state}))),
            this.selectAppTheme().pipe(map(state => ({type: 'appTheme', state}))),
            this.selectUserFavori().pipe(map(state => ({type: 'userFavori', state}))),
            this.selectUserMetadata().pipe(map(state => ({type: 'userMetadata', state}))),
            this.selectUserTheme().pipe(map(state => ({type: 'userTheme', state})))
        );
    }


    appMetadataSetName(name: string) {
        this.store.dispatch(new AppMetadataSetNameAction(name));
    }
    appMetadataSetVersion(version: string) {
        this.store.dispatch(new AppMetadataSetVersionAction(version));
    }
    appStatusSetNetworkUnknow() {
        this.store.dispatch(new AppStatusSetNetworkUnknowAction);
    }
    appStatusSetNetworkOnline() {
        this.store.dispatch(new AppStatusSetNetworkOnlineAction);
    }
    appStatusSetNetworkOffline() {
        this.store.dispatch(new AppStatusSetNetworkOfflineAction);
    }
    appStatusSetProcessOff() {
        this.store.dispatch(new AppStatusSetProcessOffAction);
    }
    appStatusSetProcessReady() {
        this.store.dispatch(new AppStatusSetProcessReadyAction);
    }
    appStatusSetProcessLoading() {
        this.store.dispatch(new AppStatusSetProcessLoadingAction);
    }
    appErrorSetError(type: string, error: Error) {
        this.store.dispatch(new AppErrorSetErrorAction(new StoreError(type, error.message)));
    }
    appErrorUnsetError() {
        this.store.dispatch(new AppErrorUnsetErrorAction);
    }
    appErrorFlushErrorStack() {
        this.store.dispatch(new AppErrorFlushErrorStackAction);
    }
    userMetadataSetFirstTime() {
        this.store.dispatch(new UserMetadataSetFirstTimeAction);
    }
    userMetadataSetAlready() {
        this.store.dispatch(new UserMetadataSetAlreadyAction);
    }
    userMetadataSetCredentials(login: string, password: string) {
        this.store.dispatch(new UserMetadataSetCredentialsAction(new UserCredentials(login, password)));
    }
    userMetadataUnsetCredentials() {
        this.store.dispatch(new UserMetadataUnsetCredentialsAction);
    }
    userMetadataAuthentifyRequest() {
        this.store.dispatch(new UserMetadataAuthentifyRequestAction);
    }
    userMetadataAuthentifySuccess(user: any) {
        this.store.dispatch(new UserMetadataAuthentifySuccessAction(user));
    }
    userThemeFetchRequest() {
        this.store.dispatch(new UserThemeFetchRequestAction);
    }
    userThemeFetchSuccess(themes: any[]) {
        this.store.dispatch(new UserThemeFetchSuccessAction(themes));
    }
    userFavoriFetchRequest() {
        this.store.dispatch(new UserFavoriFetchRequestAction);
    }
    userFavoriFetchSuccess(favoris: any[]) {
        this.store.dispatch(new UserFavoriFetchSuccessAction(favoris));
    }
    appProductFetchRequest() {
        this.store.dispatch(new AppProductFetchRequestAction);
    }
    appProductFetchSuccess(products: any[]) {
        this.store.dispatch(new AppProductFetchSuccessAction(products));
    }
    appThemeFetchRequest() {
        this.store.dispatch(new AppThemeFetchRequestAction);
    }
    appThemeFetchSuccess(themes: any[]) {
        this.store.dispatch(new AppThemeFetchSuccessAction(themes));
    }
}
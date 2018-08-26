import { Action } from '@ngrx/store';

export const AppActionTypes = {
    APP_SET_NAME: 'APP_SET_NAME',
    APP_SET_VERSION: 'APP_SET_VERSION',
    APP_LOADING_START: 'APP_LOADING_START',
    APP_LOADING_STOP: 'APP_LOADING_STOP',
    APP_SET_ERROR: 'APP_SET_ERROR',
    APP_FLUSH_ERRORS: 'APP_FLUSH_ERRORS',
}

export class AppSetNameAction implements Action {
    type = AppActionTypes.APP_SET_NAME;
    constructor(public name: string) {}
}
export class AppSetVersionAction implements Action {
    type = AppActionTypes.APP_SET_VERSION;
    constructor(public version: string) {}
}
export class AppLoadingStartAction implements Action {
    type = AppActionTypes.APP_LOADING_START;
    constructor(public content: string) {}
}
export class AppLoadingStopAction implements Action {
    type = AppActionTypes.APP_LOADING_STOP;
}
export class AppSetErrorAction implements Action {
    type = AppActionTypes.APP_SET_ERROR;
    constructor(public error: Error) {}
}
export class AppFlushErrorsAction implements Action {
    type = AppActionTypes.APP_FLUSH_ERRORS;
}

export type AppActions = AppSetNameAction
    |AppSetVersionAction
    |AppLoadingStartAction
    |AppLoadingStopAction
    |AppSetErrorAction
    |AppFlushErrorsAction;
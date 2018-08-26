import { Store, Action } from '@ngrx/store';

export const AppActionTypes = {
    APP_SET_NAME: 'APP_SET_NAME',
    APP_SET_VERSION: 'APP_SET_VERSION',
}

export class AppSetNameAction implements Action {
    type = AppActionTypes.APP_SET_NAME;
    constructor(public name: string) {}
}
export class AppSetVersionAction implements Action {
    type = AppActionTypes.APP_SET_VERSION;
    constructor(public version: string) {}
}

export type AppActions = AppSetNameAction
    |AppSetVersionAction;
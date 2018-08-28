import { Action } from '@ngrx/store';

/**
 * Ce fichier décrit tout ce dont a besoin redux
 * pour gérer l'état "global" de l'application.
 * 
 * Chaque "feature" ou "aspect" de l'application
 * devrait idéalement posséder un tel fichier.
 */

/**
 * Le model de l'etat à décrire.
 */
export interface GlobalState {
    name: string;
    version: string;
    online: boolean;
    loading: boolean;
    errors: Error[];
    error: Error;
}

/**
 * La valeur initiale de l'état à décrire.
 */
export const initialGlobalState: GlobalState = {
    name: '',
    version: '',
    online: false,
    loading: false,
    errors: [],
    error: undefined
}

/**
 * Une enum OPTIONNELLE qui rassemble
 * les valeurs des "type" d'action (implements Action@ngrx/store)
 * permettant aux composants et "effet" (implements Action@ngrx/effects)
 * de l'application, de modifier l'état à décrire.
 */
export enum GlobalActionTypes {
    setName = 'GLOBAL_SET_NAME',
    setVersion = 'GLOBAL_SET_VERSION',
    setOnline = 'GLOBAL_SET_ONLINE',
    setOffline = 'GLOBAL_SET_OFFLINE',
    setError = 'GLOBAL_SET_ERROR',
    unsetError = 'GLOBAL_UNSET_ERROR',
    flushErrors = 'GLOBAL_FLUSH_ERRORS',
    loadingStart = 'GLOBAL_LOADING_START',
    loadingStop = 'GLOBAL_LOADING_STOP',
}

export class GlobalSetNameAction implements Action {
    type = GlobalActionTypes.setName;
    constructor(public name: string) {}
}
export class GlobalSetVersionAction implements Action {
    type = GlobalActionTypes.setVersion;
    constructor(public version: string) {}
}
export class GlobalSetOnlineAction implements Action {
    type = GlobalActionTypes.setOnline;
}
export class GlobalSetOfflineAction implements Action {
    type = GlobalActionTypes.setOffline;
}
export class GlobalSetErrorAction implements Action {
    type = GlobalActionTypes.setError;
    constructor(public error: Error) {}
}
export class GlobalUnsetErrorAction implements Action {
    type = GlobalActionTypes.unsetError;
}
export class GlobalFlushErrorsAction implements Action {
    type = GlobalActionTypes.flushErrors;
}
export class GlobalLoadingStartAction implements Action {
    type = GlobalActionTypes.loadingStart;
}
export class GlobalLoadingStopAction implements Action {
    type = GlobalActionTypes.loadingStop;
}

export type GlobalActions = 
 | GlobalSetNameAction
 | GlobalSetVersionAction
 | GlobalSetOnlineAction
 | GlobalSetOfflineAction
 | GlobalSetErrorAction
 | GlobalUnsetErrorAction
 | GlobalFlushErrorsAction
 | GlobalLoadingStartAction
 | GlobalLoadingStopAction

 export function globalReducer(state: GlobalState = initialGlobalState, action: GlobalActions): GlobalState {
    switch (action.type) {
        case GlobalActionTypes.setName:
            return {
                ...state,
                name: (<GlobalSetNameAction>action).name,
            };
        case GlobalActionTypes.setVersion:
            return {
                ...state,
                version: (<GlobalSetVersionAction>action).version,
            };
        case GlobalActionTypes.setOnline:
            return {
                ...state,
                online: true,
            };
        case GlobalActionTypes.setOffline:
            return {
                ...state,
                online: false,
            };
        case GlobalActionTypes.setError:
            return {
                ...state,
                error: (<GlobalSetErrorAction>action).error,
                errors: [...state.errors, (<GlobalSetErrorAction>action).error],
            };
        case GlobalActionTypes.unsetError:
            return {
                ...state,
                error: undefined,
            };
        case GlobalActionTypes.flushErrors:
            return {
                ...state,
                error: undefined,
                errors: [],
            };
        case GlobalActionTypes.loadingStart:
            return {
                ...state,
                loading: true,
            };
        case GlobalActionTypes.loadingStop:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
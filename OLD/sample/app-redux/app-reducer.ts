import { AppState, initialAppState } from './app-state';
import { Action } from '@ngrx/store';
import {
    AppActions,
    AppSetNameAction,
    AppSetVersionAction,
    AppActionTypes
} from './app-actions';

export const appReducer = (state: AppState = initialAppState, action: Action) => {
    switch (action.type) {
        case AppActionTypes.APP_SET_NAME:
            return {...state, name: (<AppSetNameAction>action).name};
        case AppActionTypes.APP_SET_VERSION:
            return {...state, version: (<AppSetVersionAction>action).version};
        default:
            return state;
    }
}
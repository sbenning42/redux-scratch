import { Action } from '@ngrx/store';
import { AppState, initialAppState } from '../state/app-state';
import {
    AppActionTypes,
    AppSetNameAction,
    AppSetVersionAction,
    AppLoadingStartAction,
    AppLoadingStopAction,
    AppSetErrorAction,
    AppFlushErrorsAction,
} from '../actions/app-actions';

export const appReducer = (state: AppState = initialAppState, action: Action) => {
    switch (action.type) {
        
        case AppActionTypes.APP_SET_NAME:
            return {...state, name: (<AppSetNameAction>action).name};
        
        case AppActionTypes.APP_SET_VERSION:
            return {...state, version: (<AppSetVersionAction>action).version};
        
        case AppActionTypes.APP_LOADING_START:
            return {...state, loading: true};
        
        case AppActionTypes.APP_LOADING_STOP:
            return {...state, loading: false};
        
        case AppActionTypes.APP_SET_ERROR: {
            const errors = [...state.errors, (<AppSetErrorAction>action).error];
            return {...state, errors, lastError: (<AppSetErrorAction>action).error};
        }
        
        case AppActionTypes.APP_FLUSH_ERRORS: {
            const errors = [];
            return {...state, errors, lastError: undefined};
        }
        
        default:
            return state;
    }
}
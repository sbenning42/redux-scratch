import { Action } from '@ngrx/store';
import { PreferencesState, initialPreferencesState } from '../state/preferences-state';
import {
    PreferencesActionTypes,
    PreferencesFetchRequestAction,
    PreferencesFetchResponseAction,
} from '../actions/preferences-actions';

export const preferencesReducer = (state: PreferencesState = initialPreferencesState, action: Action) => {
    switch (action.type) {
       
        case PreferencesActionTypes.PREFERENCES_FETCH_REQUEST:
            return {...state, fetched: false, collection: [], userId: (<PreferencesFetchRequestAction>action).userId};

        case PreferencesActionTypes.PREFERENCES_FETCH_RESPONSE:
            return {...state, fetched: true, collection: (<PreferencesFetchResponseAction>action).preferences};
        
        default:
            return state;
    }
}
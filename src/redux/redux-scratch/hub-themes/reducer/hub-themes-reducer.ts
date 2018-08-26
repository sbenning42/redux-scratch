import { Action } from '@ngrx/store';
import { HubThemesState, initialHubThemesState } from '../state/hub-themes-state';
import {
    HubThemesActionTypes,
    HubThemesFetchRequestAction,
    HubThemesFetchResponseAction,
} from '../actions/hub-themes-actions';

export const hubThemesReducer = (state: HubThemesState = initialHubThemesState, action: Action) => {
    switch (action.type) {
       
        case HubThemesActionTypes.HUBTHEMES_FETCH_RESPONSE:
            return {...state, fetched: true, collection: (<HubThemesFetchResponseAction>action).hubThemes};
        
        default:
            return state;
    }
}
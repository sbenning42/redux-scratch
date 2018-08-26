import { Action } from '@ngrx/store';
import { Preference } from '../state/preferences-state';

export const PreferencesActionTypes = {
    PREFERENCES_FETCH_REQUEST: 'PREFERENCES_FETCH_REQUEST',
    PREFERENCES_FETCH_RESPONSE: 'PREFERENCES_FETCH_RESPONSE',
}

export class PreferencesFetchRequestAction implements Action {
    type = PreferencesActionTypes.PREFERENCES_FETCH_REQUEST;
    constructor(public userId: string) {}
}
export class PreferencesFetchResponseAction implements Action {
    type = PreferencesActionTypes.PREFERENCES_FETCH_RESPONSE;
    constructor(public preferences: Preference[]) {}
}


export type PreferencesActions = PreferencesFetchRequestAction
    |PreferencesFetchResponseAction;
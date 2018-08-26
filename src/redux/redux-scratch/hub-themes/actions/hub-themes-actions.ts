import { Action } from '@ngrx/store';
import { HubTheme } from '../state/hub-themes-state';

export const HubThemesActionTypes = {
    HUBTHEMES_FETCH_REQUEST: 'HUBTHEMES_FETCH_REQUEST',
    HUBTHEMES_FETCH_RESPONSE: 'HUBTHEMES_FETCH_RESPONSE',
}

export class HubThemesFetchRequestAction implements Action {
    type = HubThemesActionTypes.HUBTHEMES_FETCH_REQUEST;
}
export class HubThemesFetchResponseAction implements Action {
    type = HubThemesActionTypes.HUBTHEMES_FETCH_RESPONSE;
    constructor(public hubThemes: HubTheme[]) {}
}


export type HubThemesActions = HubThemesFetchRequestAction
    |HubThemesFetchResponseAction;
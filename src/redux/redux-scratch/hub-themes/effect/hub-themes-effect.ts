import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import {
    HubThemesActionTypes,
    HubThemesFetchRequestAction,
    HubThemesFetchResponseAction
} from '../actions/hub-themes-actions';
import {
    AppActionTypes,
    AppLoadingStartAction,
    AppLoadingStopAction,
    AppSetErrorAction
} from '../../app/actions/app-actions';

import { HubTheme } from '../state/hub-themes-state';

import {
    distinctUntilChanged,
    distinctUntilSerialChanged,
    ofType, ofTypes,
    tap, map, merge, filter, switchMap, of, delay, catchError
} from '../../../ngrx-helpers';

import { HubThemesProvider } from '../../../../providers/hub-themes/hub-themes';

@Injectable()
export class HubThemesEffects {

    constructor(private actions: Actions, public hubThemesProvider: HubThemesProvider) {}

    startLoading$ = this.actions.pipe(
        ofType(HubThemesActionTypes.HUBTHEMES_FETCH_REQUEST),
        map(() => new AppLoadingStartAction('Fetching hub themes ...'))
    );
    stopLoading$ = this.actions.pipe(
        ofTypes([HubThemesActionTypes.HUBTHEMES_FETCH_RESPONSE, AppActionTypes.APP_SET_ERROR]),
        map(() => new AppLoadingStopAction)
    );
    fetchPipeline$ = this.actions.pipe(
        ofType(HubThemesActionTypes.HUBTHEMES_FETCH_REQUEST),
        switchMap((action: HubThemesFetchRequestAction) => this.hubThemesProvider.fetch().pipe(
            map((hubThemes: HubTheme[]) => new HubThemesFetchResponseAction(hubThemes)),
            catchError((error: Error) => of(new AppSetErrorAction(error)))
        )),
    );

    @Effect()
    hubThemes$ = merge(
        this.startLoading$,
        this.stopLoading$,
        this.fetchPipeline$
    );

}
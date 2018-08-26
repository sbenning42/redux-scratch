import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import {
    PreferencesActionTypes,
    PreferencesFetchRequestAction,
    PreferencesFetchResponseAction
} from '../actions/preferences-actions';
import {
    AppActionTypes,
    AppLoadingStartAction,
    AppLoadingStopAction,
    AppSetErrorAction
} from '../../app/actions/app-actions';

import { Preference } from '../state/preferences-state';

import {
    distinctUntilChanged,
    distinctUntilSerialChanged,
    ofType, ofTypes,
    tap, map, merge, filter, switchMap, of, delay, catchError
} from '../../../ngrx-helpers';

import { PreferencesProvider } from '../../../../providers/preferences/preferences';

@Injectable()
export class PreferencesEffects {

    constructor(private actions: Actions, public preferencesProvider: PreferencesProvider) {}

    startLoading$ = this.actions.pipe(
        ofType(PreferencesActionTypes.PREFERENCES_FETCH_REQUEST),
        map(() => new AppLoadingStartAction('Fetching preferences ...'))
    );
    stopLoading$ = this.actions.pipe(
        ofTypes([PreferencesActionTypes.PREFERENCES_FETCH_RESPONSE, AppActionTypes.APP_SET_ERROR]),
        map(() => new AppLoadingStopAction)
    );
    fetchPipeline$ = this.actions.pipe(
        ofType(PreferencesActionTypes.PREFERENCES_FETCH_REQUEST),
        switchMap((action: PreferencesFetchRequestAction) => this.preferencesProvider.fetch(action.userId).pipe(
            map((preferences: Preference[]) => new PreferencesFetchResponseAction(preferences)),
            catchError((error: Error) => of(new AppSetErrorAction(error)))
        )),
    );

    @Effect()
    preferences$ = merge(
        this.startLoading$,
        this.stopLoading$,
        this.fetchPipeline$
    );

}
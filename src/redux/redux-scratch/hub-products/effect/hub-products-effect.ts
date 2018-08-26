import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import {
    HubProductsActionTypes,
    HubProductsFetchRequestAction,
    HubProductsFetchResponseAction
} from '../actions/hub-products-actions';
import {
    AppActionTypes,
    AppLoadingStartAction,
    AppLoadingStopAction,
    AppSetErrorAction
} from '../../app/actions/app-actions';

import { HubProduct } from '../state/hub-products-state';

import {
    distinctUntilChanged,
    distinctUntilSerialChanged,
    ofType, ofTypes,
    tap, map, merge, filter, switchMap, of, delay, catchError
} from '../../../ngrx-helpers';

import { HubProductsProvider } from '../../../../providers/hub-products/hub-products';

@Injectable()
export class HubProductsEffects {

    constructor(private actions: Actions, public hubProductsProvider: HubProductsProvider) {}

    startLoading$ = this.actions.pipe(
        ofType(HubProductsActionTypes.HUBPRODUCTS_FETCH_REQUEST),
        map(() => new AppLoadingStartAction('Fetching hub products ...'))
    );
    stopLoading$ = this.actions.pipe(
        ofTypes([HubProductsActionTypes.HUBPRODUCTS_FETCH_RESPONSE, AppActionTypes.APP_SET_ERROR]),
        map(() => new AppLoadingStopAction)
    );
    fetchPipeline$ = this.actions.pipe(
        ofType(HubProductsActionTypes.HUBPRODUCTS_FETCH_REQUEST),
        switchMap((action: HubProductsFetchRequestAction) => this.hubProductsProvider.fetch().pipe(
            map((hubProducts: HubProduct[]) => new HubProductsFetchResponseAction(hubProducts)),
            catchError((error: Error) => of(new AppSetErrorAction(error)))
        )),
    );

    @Effect()
    hubProducts$ = merge(
        this.startLoading$,
        this.stopLoading$,
        this.fetchPipeline$
    );

}
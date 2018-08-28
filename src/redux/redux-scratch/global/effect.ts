import { LoadingController, LoadingOptions, Loading } from 'ionic-angular';
import { Observable } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ofType, ofTypes } from '../../ngrx-helpers';

import {
    GlobalActionTypes,
    GlobalLoadingStartAction,
    GlobalLoadingStopAction,
} from './state';

export function loadingFactory(actions$: Observable<Action>, loadingCtrl: LoadingController): Observable<Action> {
    const isLoading: boolean = false;
    let loading: Loading;
    return actions$.pipe(
        ofType(GlobalActionTypes.loadingStart),
        tap((action: GlobalLoadingStartAction) => {
            if (isLoading) return ;
            loading = loadingCtrl.create(action)
        }),
    );
}
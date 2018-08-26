import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import {
    AppActionTypes,
    AppLoadingStartAction,
    AppLoadingStopAction,
} from '../actions/app-actions';

import {
    distinctUntilChanged,
    distinctUntilSerialChanged,
    ofType, ofTypes,
    tap, merge, filter, switchMap, of, map, catchError
} from '../../../ngrx-helpers';

import { OverlayProvider } from '../../../../providers/overlay/overlay';

export interface IOverlayProvider extends Injectable {
    createLoading(opts: any): any;
    presentLoading(): any;
    dismissLoading(): any;
}

const defaultOverlayProvider: IOverlayProvider = {
    createLoading: (opts: any) => console.log('Overlay create loading. Content: ', opts.content),
    presentLoading: () => console.log('Overlay present loading'),
    dismissLoading: () => console.log('Overlay dismiss loading')
};

@Injectable()
export class AppEffects {
    loading: boolean = false;
    constructor(private actions: Actions, public overlay: OverlayProvider) {}

    loadingStart$ = this.actions.pipe(
        filter((action: Action) => AppActionTypes.APP_LOADING_START === action.type),
        tap((action: Action) => {
            if (!this.loading) {
                this.loading = true;
                this.overlay.createLoading({content: (<AppLoadingStartAction>action).content});
                this.overlay.presentLoading();
            }
        }),
        switchMap(() => of())
    );
    loadingStop$ = this.actions.pipe(
        filter((action: Action) => AppActionTypes.APP_LOADING_STOP === action.type),
        tap((action: Action) => {
            if (this.loading) {
                this.loading = false;
                this.overlay.dismissLoading();
            }
        }),
        switchMap(() => of())
    );

    @Effect()
    loading$ = merge(
        this.loadingStart$,
        this.loadingStop$
    );

}

    /*
    
@Injectable()
export class AuthService {
    login(credentials) {
        return of({
            token: 'xxx123xxx'
        }).pipe(delay(1500));
    }
}
    @Effect()
    login$ = this.actions.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN),
        tap(() => this.store.dispatch(new AuthLoginPendingAction)),
        switchMap((action: AuthLoginAction) => this.authService.login({login: action.login, password: action.password}).pipe(
            map((response: any) => new AuthLoginSuccessAction(response.token)),
            catchError((error: Error) => of(new AuthLoginErrorAction(error.message)))
        )),
    );
    */
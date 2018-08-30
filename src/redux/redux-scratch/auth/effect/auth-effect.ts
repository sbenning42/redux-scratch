import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import {
    AuthActionTypes,
    AuthLoginRequestAction,
    AuthLoginResponseAction,
} from '../actions/auth-actions';
import {
    AppActionTypes,
    AppLoadingStartAction,
    AppLoadingStopAction,
    AppSetErrorAction
} from '../../app/actions/app-actions';

import { AuthUser } from '../state/auth-state';

import {
    distinctUntilChanged,
    distinctUntilSerialChanged,
    ofType, ofTypes, Observable,
    tap, map, merge, filter, switchMap, of, delay, catchError
} from '../../../ngrx-helpers';

import { AuthProvider } from '../../../../providers/auth/auth';

/*
export interface IAuthProvider extends Injectable {
    login(credentials: {login: string, password: string}): Observable<AuthUser>;
}

const defaultAuthProvider: IAuthProvider = {
    login(credentials: {login: string, password: string}): Observable<AuthUser> {
        return credentials.login === 'sben@sben.sben'
            ? of({id: '123', email: 'sben@sben.sben', name: 'sben'}).pipe(delay(1500))
            : of(false).pipe(
                delay(1500),
                switchMap(() => { throw new Error('Wrong credentials'); })
            );
    }
};
*/

@Injectable()
export class AuthEffects {

    constructor(private actions: Actions, public authProvider: AuthProvider) {}

    startLoading$ = this.actions.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN_REQUEST),
        map(() => new AppLoadingStartAction('Authentification ...'))
    );
    stopLoading$ = this.actions.pipe(
        ofTypes([AuthActionTypes.AUTH_LOGIN_RESPONSE, AppActionTypes.APP_SET_ERROR]),
        map(() => new AppLoadingStopAction)
    );
    loginPipeline$ = this.actions.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN_REQUEST),
        switchMap((action: AuthLoginRequestAction) => this.authProvider.login(action.credentials).pipe(
            map((authUser: AuthUser) => new AuthLoginResponseAction(authUser)),
            catchError((error: Error) => of(new AppSetErrorAction(error)))
        )),
    );

    @Effect()
    login$ = merge(
        this.startLoading$,
        this.stopLoading$,
        this.loginPipeline$
    );

}
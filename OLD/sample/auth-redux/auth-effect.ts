import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, filter, delay, catchError } from 'rxjs/operators';
import {
    AuthLoginAction,
    AuthLoginPendingAction,
    AuthLoginSuccessAction,
    AuthLoginErrorAction,
    AuthActionTypes
} from './auth-actions';
import { ofType } from '../index';
import { RootStore } from '../../../app/app.module';

@Injectable()
export class AuthService {
    login(credentials) {
        return of({
            token: 'xxx123xxx'
        }).pipe(delay(1500));
    }
}

@Injectable()
export class AuthEffects {
    constructor(private actions: Actions, private authService: AuthService, private store: Store<RootStore>) {}
    @Effect()
    login$ = this.actions.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN),
        tap(() => this.store.dispatch(new AuthLoginPendingAction)),
        switchMap((action: AuthLoginAction) => this.authService.login({login: action.login, password: action.password}).pipe(
            map((response: any) => new AuthLoginSuccessAction(response.token)),
            catchError((error: Error) => of(new AuthLoginErrorAction(error.message)))
        )),
    );
}
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
    AuthState,
    authStateSelector,
    stateChanged,
    AuthLoginAction,
} from '../index';
import { RootStore } from '../../../app/app.module';

@Injectable()
export class AuthReduxService {

    constructor(public store: Store<RootStore>) {}

    select(): Observable<AuthState> {
        return <Observable<AuthState>>this.store.select(authStateSelector).pipe(stateChanged);
    }

    login(credentials: {login: string, password: string}): void {
        this.store.dispatch(new AuthLoginAction(credentials.login, credentials.password));
    }

    credentials(): Observable<{login: string, password: string}> {
        return <Observable<{login: string, password: string}>>this.select().pipe(
            map((authState: AuthState) => authState.credentials),
            stateChanged
        );
    }

    authentified(): Observable<boolean> {
        return <Observable<boolean>>this.select().pipe(
            map((authState: AuthState) => authState.authentified),
            distinctUntilChanged()
        );
    }

    token(): Observable<string> {
        return <Observable<string>>this.select().pipe(
            map((authState: AuthState) => authState.token),
            distinctUntilChanged()
        );
    }

    pending(): Observable<boolean> {
        return <Observable<boolean>>this.select().pipe(
            map((authState: AuthState) => authState.pending),
            distinctUntilChanged()
        );
    }

    error(): Observable<string> {
        return <Observable<string>>this.select().pipe(
            map((authState: AuthState) => authState.error),
            distinctUntilChanged()
        );
    }

}
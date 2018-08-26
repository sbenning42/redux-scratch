import { Store, Action } from '@ngrx/store';

export const AuthActionTypes = {
    AUTH_LOGIN: 'AUTH_LOGIN',
    AUTH_LOGIN_PENDING: 'AUTH_LOGIN_PENDING',
    AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    AUTH_LOGIN_ERROR: 'AUTH_LOGIN_ERROR'
}

export class AuthLoginAction implements Action {
    type = AuthActionTypes.AUTH_LOGIN;
    constructor(public login: string, public password: string) {}
}
export class AuthLoginPendingAction implements Action {
    type = AuthActionTypes.AUTH_LOGIN_PENDING;
}
export class AuthLoginSuccessAction implements Action {
    type = AuthActionTypes.AUTH_LOGIN_SUCCESS;
    constructor(public token: string) {}
}
export class AuthLoginErrorAction implements Action {
    type = AuthActionTypes.AUTH_LOGIN_ERROR;
    constructor(public error: string) {}
}

export type AuthActions = AuthLoginAction
    |AuthLoginPendingAction
    |AuthLoginSuccessAction
    |AuthLoginErrorAction;
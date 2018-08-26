import { Action } from '@ngrx/store';
import { AuthUser } from '../state/auth-state';

export const AuthActionTypes = {
    AUTH_LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
    AUTH_LOGIN_RESPONSE: 'AUTH_LOGIN_RESPONSE',
}


export class AuthLoginRequestAction implements Action {
    type = AuthActionTypes.AUTH_LOGIN_REQUEST;
    constructor(public credentials: {login: string, password: string}) {}
}
export class AuthLoginResponseAction implements Action {
    type = AuthActionTypes.AUTH_LOGIN_RESPONSE;
    constructor(public authUser: AuthUser) {}
}


export type AuthActions = AuthLoginRequestAction
    |AuthLoginResponseAction;
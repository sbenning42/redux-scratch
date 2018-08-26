import { AuthState, initialAuthState } from './auth-state';
import {
    AuthActions,
    AuthLoginAction,
    AuthLoginSuccessAction,
    AuthLoginErrorAction,
    AuthActionTypes
} from './auth-actions';

export const authReducer = (state: AuthState = initialAuthState, action: AuthActions) => {
    switch (action.type) {
        case AuthActionTypes.AUTH_LOGIN:
            return {...state, credentials: {login: (<AuthLoginAction>action).login, password: (<AuthLoginAction>action).password}};
        case AuthActionTypes.AUTH_LOGIN_PENDING:
            return {...state, pending: true};
        case AuthActionTypes.AUTH_LOGIN_SUCCESS:
            return {...state, pending: false, authentified: true, token: (<AuthLoginSuccessAction>action).token};
        case AuthActionTypes.AUTH_LOGIN_ERROR:
            return {...state, pending: false, authentified: false, error: (<AuthLoginErrorAction>action).error};
        default:
            return state;
    }
}
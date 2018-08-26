import { Action } from '@ngrx/store';
import { AuthState, initialAuthState } from '../state/auth-state';
import {
    AuthActionTypes,
    AuthLoginResponseAction,
} from '../actions/auth-actions';

export const authReducer = (state: AuthState = initialAuthState, action: Action) => {
    switch (action.type) {
       
        case AuthActionTypes.AUTH_LOGIN_RESPONSE:
            return {...state, authentified: true, authUser: (<AuthLoginResponseAction>action).authUser};
        
        default:
            return state;
    }
}
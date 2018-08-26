import { UserState, initialUserState } from './user-state';
import {
    UserActions,
    UserFetchSuccessAction,
    UserFetchErrorAction,
    UserActionTypes,
} from './user-actions';

export const userReducer = (state: UserState = initialUserState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.USER_FETCH_PENDING:
            return {...state, pending: true};
        case UserActionTypes.USER_FETCH_SUCCESS:
            return {...state, pending: false, user: (<UserFetchSuccessAction>action).user};
        case UserActionTypes.USER_FETCH_ERROR:
            return {...state, pending: false, error: (<UserFetchErrorAction>action).error};
        default:
            return state;
    }
}
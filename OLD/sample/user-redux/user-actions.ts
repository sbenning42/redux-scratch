import { Store, Action } from '@ngrx/store';
import { User } from './user-state';

export const UserActionTypes = {
    USER_FETCH: 'USER_FETCH',
    USER_FETCH_PENDING: 'USER_FETCH_PENDING',
    USER_FETCH_SUCCESS: 'USER_FETCH_SUCCESS',
    USER_FETCH_ERROR: 'USER_FETCH_ERROR'
}

export class UserFetchAction implements Action {
    type = UserActionTypes.USER_FETCH;
}
export class UserFetchPendingAction implements Action {
    type = UserActionTypes.USER_FETCH_PENDING;
}
export class UserFetchSuccessAction implements Action {
    type = UserActionTypes.USER_FETCH_SUCCESS;
    constructor(public user: User) {}
}
export class UserFetchErrorAction implements Action {
    type = UserActionTypes.USER_FETCH_ERROR;
    constructor(public error: string) {}
}

export type UserActions = UserFetchAction
    |UserFetchPendingAction
    |UserFetchSuccessAction
    |UserFetchErrorAction;
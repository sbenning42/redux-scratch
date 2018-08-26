import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, filter, delay, catchError } from 'rxjs/operators';
import {
    UserFetchPendingAction,
    UserFetchSuccessAction,
    UserFetchErrorAction,
    UserActionTypes,
} from './user-actions';
import { ofTypes, ofType, User } from '../index';
import { OverlayProvider } from '../../../providers/overlay/overlay';
import { RootStore } from '../../../app/app.module';

@Injectable()
export class UserService {
    fetch() {
        return of(<User>{
            id: '123',
            email: 'sben@sben.sben',
            password: undefined,
            username: 'Sben42'
        }).pipe(delay(1500)/*, switchMap(() => {throw new Error('Wrong credentials')})*/);
    }
}

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private userService: UserService,
        private overlay: OverlayProvider,
        private store: Store<RootStore>
    ) {}
    @Effect()
    fetch$ = this.actions.pipe(
        ofTypes([
            UserActionTypes.USER_FETCH,
            UserActionTypes.USER_FETCH_PENDING,
            UserActionTypes.USER_FETCH_SUCCESS,
            UserActionTypes.USER_FETCH_ERROR,
        ]),
        tap(action => {
            switch (action.type) {
                case UserActionTypes.USER_FETCH_PENDING:
                    this.overlay.createLoading({content: 'Fetching User'});
                    this.overlay.presentLoading();
                    break ;
                case UserActionTypes.USER_FETCH_SUCCESS:
                case UserActionTypes.USER_FETCH_ERROR:
                    this.overlay.dismissLoading();
                    break ;
                case UserActionTypes.USER_FETCH:
                    this.store.dispatch(new UserFetchPendingAction);
                    break ;
                default:
                    break ;
            }
        }),
        ofType(UserActionTypes.USER_FETCH),
        switchMap(action => this.userService.fetch().pipe(
            map((response: any) => new UserFetchSuccessAction(<User>response)),
            catchError((error: Error) => of(new UserFetchErrorAction(error.message)))
        ))
    );
}
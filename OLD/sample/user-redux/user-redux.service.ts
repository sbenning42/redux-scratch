import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
    User,
    UserState,
    userStateSelector,
    stateChanged,
    UserFetchAction,
} from '../index';
import { RootStore } from '../../../app/app.module';

@Injectable()
export class UserReduxService {

    constructor(public store: Store<RootStore>) {}

    select(): Observable<UserState> {
        return <Observable<UserState>>this.store.select(userStateSelector).pipe(stateChanged);
    }

    fetch(): void {
        this.store.dispatch(new UserFetchAction);
    }

    user(): Observable<User> {
        return <Observable<User>>this.select().pipe(
            map((userState: UserState) => userState.user),
            stateChanged
        );
    }

    pending(): Observable<boolean> {
        return <Observable<boolean>>this.select().pipe(
            map((userState: UserState) => userState.pending),
            distinctUntilChanged()
        );
    }

    error(): Observable<string> {
        return <Observable<string>>this.select().pipe(
            map((userState: UserState) => userState.error),
            distinctUntilChanged()
        );
    }

}
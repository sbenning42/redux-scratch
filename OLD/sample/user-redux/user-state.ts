import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, filter, delay, catchError, distinctUntilChanged } from 'rxjs/operators';

export interface User {
    id: string;
    email: string;
    password: string;
    username: string;
}

export interface UserState {
    pending: boolean;
    error: string;
    user: User;
}

export const initialUserState: UserState = {
    pending: false,
    error: undefined,
    user: undefined
}
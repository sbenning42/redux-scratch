import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, filter, delay, catchError, distinctUntilChanged } from 'rxjs/operators';

export interface AuthState {
    pending: boolean;
    error: string;
    authentified: boolean;
    credentials: {login: string, password: string};
    token: string;
}

export const initialAuthState: AuthState = {
    pending: false,
    error: undefined,
    authentified: false,
    credentials: undefined,
    token: undefined,
}
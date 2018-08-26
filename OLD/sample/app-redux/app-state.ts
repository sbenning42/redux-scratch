import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, filter, delay, catchError, distinctUntilChanged } from 'rxjs/operators';

export interface AppState {
    name: string;
    version: string;
}

export const initialAppState: AppState = {
    name: 'Redux Ionic App',
    version: '1.0.0'
};
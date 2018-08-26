import { Action } from '@ngrx/store';
import {
    Observable,
    merge
} from 'rxjs';
import {
    map,
    filter,
    tap,
    distinctUntilChanged,
    catchError,
    switchMap
} from 'rxjs/operators';

export {
    Observable,
    of,
    merge
} from 'rxjs';
export {
    map,
    filter,
    tap,
    distinctUntilChanged,
    catchError,
    switchMap, delay
} from 'rxjs/operators';

export const distinctUntilSerialChanged = () => distinctUntilChanged(
    (x, y) => JSON.stringify(x) === JSON.stringify(y)
);

export const ofType = (type: string) => filter((action: Action) => type === action.type);

export const ofTypes = (types: string[]) => filter((action: Action) => types.some(type => type === action.type));
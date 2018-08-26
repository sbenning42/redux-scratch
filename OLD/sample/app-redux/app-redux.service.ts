import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
    AppState,
    appStateSelector,
    stateChanged,
    AppSetNameAction,
    AppSetVersionAction
} from '../index';
import { RootStore } from '../../../app/app.module';

@Injectable()
export class AppReduxService {

    constructor(public store: Store<RootStore>) {}

    select(): Observable<AppState> {
        return <Observable<AppState>>this.store.select(appStateSelector).pipe(stateChanged);
    }

    setName(name: string): void {
        this.store.dispatch(new AppSetNameAction(name));
    }

    setVersion(version: string): void {
        this.store.dispatch(new AppSetVersionAction(version));
    }

    name(): Observable<string> {
        return <Observable<string>>this.select().pipe(
            map((appState: AppState) => appState.name),
            distinctUntilChanged()
        );
    }

    version(): Observable<string> {
        return <Observable<string>>this.select().pipe(
            map((appState: AppState) => appState.version),
            distinctUntilChanged()
        );
    }

}